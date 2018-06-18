import { Directive, EventEmitter, ElementRef, HostListener, Input, Output } from '@angular/core';
import { FileItem } from '../models/file-item.model';
import { getTestBed } from '@angular/core/testing';


@Directive({
  selector: '[appNgDropFiles]'
})
export class NgDropFilesDirective {


  @Input() archivo: FileItem[] = [];
  @Output() mouseSobre: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  @HostListener('dragover', ['$event']) // hostlistener: para especificar algo cuando se arrastre sobre el elemento
  public onDragEnter( event: any) {
    this.mouseSobre.emit( true ); //el mouse está sobre el elemento
    this.prevenirDetener( event );
  }

  @HostListener('dragleave', ['$event']) // 'dragLeave' = cuando no está sobre el elemento
  public onDragLeave( event: any) {
    this.mouseSobre.emit( false ); //el mouse ya NO está sobre el elemento
  }

  @HostListener('drop', ['$event']) // drop = cuando ya se soltó el mouse
  public onDrop( event: any) {
    this.mouseSobre.emit( false );
    
    const transferencia = this.getTranferencia( event );

    if( !transferencia ) {
      return;
    }

    this.extraerArchivos( transferencia.files );

    this.prevenirDetener( event );

    this.mouseSobre.emit( false);
    
  }

  private getTranferencia ( event: any ) { 
    
    //se requiere pq ciertos navegadores manejan o bien "dataTransfer" o "originalEvent.dataTransfer". Extiende la compatibilidad
    return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer;
  }

  private extraerArchivos ( archivoLista: FileList ) {
    console.log( archivoLista);

    for ( const propiedad in Object.getOwnPropertyNames(archivoLista)) {
      
      const archivoTemporal = archivoLista[propiedad];

      if( this.archivoPuedeSerCargado( archivoTemporal )) {

        const nuevoArchivo = new FileItem ( archivoTemporal );
        this.archivo.push( nuevoArchivo );

      }
    }
    console.log(this.archivo);
  }


  //VALIDATIONS:

  private archivoPuedeSerCargado ( archivo: File ) : boolean {
    if( !this.archivoYaCargado( archivo.name ) && this.esImagen(archivo.type)) {
      return true;
    } else {
      return false;
    }
  }

  private prevenirDetener( event ) {
    event.preventDefault();
    event.stopPropagation();
  }

  private archivoYaCargado( nombreArchivo: string ) : boolean {
    for ( const archivo of this.archivo) {
        if ( archivo.nombreArchivo == nombreArchivo ) {
          console.log(`el archivo ${nombreArchivo} ya está agregado`)
          return true;
        }
    }
    return false;
  }

  private esImagen ( tipoArchivo: string ): boolean {
    return ( tipoArchivo === '' || tipoArchivo === undefined ) ? false: tipoArchivo.startsWith('image');
  }

}
