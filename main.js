window.onload = init

function init(){

    const mi_mapa = document.getElementById('mapa')

    

    // SELECIONES DE VISTA DEL MAPA 


    const mi_layer = L.tileLayer(
        'https://tile.openstreetmap.org/{z}/{x}/{y}.png',{
            
            attribution:  '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        });
    const mi_layer_2 = L.tileLayer('https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png', {
	maxZoom: 20,
	attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
    });
    const mi_layer_3 = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
	maxZoom: 20,
	attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
});

//

const opciones_layer = {
    'Vista Compleja':mi_layer,
    'Vista simple':mi_layer_2,
    'Vista simple - modo oscuro':mi_layer_3,
}


    //CONFIG DEL EL MAPA

    const mapa = L.map(mi_mapa,{ 
        center: [-33.0438638,-71.6046135],
        zoom: 14,
        layers:[mi_layer],
        worldCopyJump: true
    })

    const WMSlayer = L.tileLayer.wms('http://localhost:8080/geoserver/cite/wms?',{
        Layers:'predios_rol_de_cobros_1er_semestre_2017_agricola_y_no_agricola',
        format: 'image/png',
        transparent: true
    });

    const opciones_wms = {
        'rol_de_cobros':WMSlayer,
    }


    const imageUrl = 'https://maps.lib.utexas.edu/maps/historical/newark_nj_1922.jpg',
    imageBounds = [[40.712216, -74.22655], [40.773941, -74.12544]];
    L.imageOverlay(imageUrl, imageBounds).addTo(mapa);

    

    // EJEMPLO DE POPUP 

    const Pmarca = L.marker([-33.0438638,-71.6046135],{
        title: 'popup'

    }).addTo(mapa);


    const Pmarcapopu =  Pmarca.bindPopup("HOLA SOY UN POPUP");
    const control_layer = L.control.layers(opciones_layer,opciones_wms,{collapsed:false,position:'bottomleft'}).addTo(mapa)
    

    // EJEMPLO DE POLIGONES-LINEA EN EL MAPA 

//     mapa.locate({setView:true,})

//     var dibujar_poligonos = L.polyline([],{color:'red' }).addTo(mapa)

//     mapa.on('click', function(e){ ;
//         dibujar_poligonos.addLatLng(e.latlng)

//     })
//     var termino_de_poligono = L.polyline([],{color:'blue' }).addTo(mapa)
//     var push_poligonos = []
//     mapa.on('dblclick', function(e){ ;
//        let fin_poligonos = dibujar_poligonos.getLatLngs()
//        fin_poligonos = fin_poligonos.slice(0,fin_poligonos.length -1)
//        push_poligonos.push(fin_poligonos)
       
//        termino_de_poligono.setLatLngs([push_poligonos])
//        dibujar_poligonos.setLatLngs([])

    
// })
    // EJEMPLO DE POLIGONES-COMPLETOS EN EL MAPA 

    mapa.locate({setView:true,})

    var dibujar_poligonos_c = L.polygon([],{color:'red' }).addTo(mapa)
    function dibujarpoli(){
    mapa.on('click', function(e){ ;
        dibujar_poligonos_c.addLatLng(e.latlng)

    })
}
    
    var termino_de_poligono_c = L.polygon([],{color:'blue' }).addTo(mapa)
    var push_poligonos_c = []
    mapa.on('dblclick', function(e){ ;
       let fin_poligonos_c = dibujar_poligonos_c.getLatLngs()
       console.log(fin_poligonos_c)
       fin_poligonos_c = fin_poligonos_c[0].slice(0,fin_poligonos_c[0].length -1)

       push_poligonos_c.push(fin_poligonos_c)
       termino_de_poligono_c.setLatLngs([push_poligonos_c])

       dibujar_poligonos_c.setLatLngs([])
       mapa.off('click')
       let elemento_dibujar_poligonos = document.querySelector('.draw-polygon');
       if(elemento_dibujar_poligonos){
            L.DomUtil.removeClass(elemento_dibujar_poligonos,'draw-activate')
       }

})
    L.Control.CustomDrawGeometryTools = L.Control.extend({
        onAdd: function(mapa){
            var div = L.DomUtil.create('button','draw-polygon')
            div.innerHTML = 'Dibujar poligono'
            L.DomEvent.on(div,'click',function(e){
                L.DomEvent.stopPropagation(e);
                let botondibujarpoligonos = div.classList.toggle('draw-activate')
            if(botondibujarpoligonos){
                console.log(botondibujarpoligonos)
                L.DomEvent.stopPropagation(e);
                dibujarpoli()
            }else{
            console.log(botondibujarpoligonos)
            L.DomEvent.stopPropagation(e);
            let fin_poligonos_c = dibujar_poligonos_c.getLatLngs()
            fin_poligonos_c = fin_poligonos_c[0].slice(0,fin_poligonos_c[0].length)
            push_poligonos_c.push(fin_poligonos_c)
            termino_de_poligono_c.setLatLngs([push_poligonos_c])
            dibujar_poligonos_c.setLatLngs([])
            mapa.off('click')
            }
            
            })
            return div
        }

})
L.control.customdrawgeometrytools = function(opts){
    return new L.Control.CustomDrawGeometryTools(opts)
}
L.control.customdrawgeometrytools({position: 'topleft'}).addTo(mapa)



}


