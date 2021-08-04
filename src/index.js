mapboxgl.accessToken = 'pk.eyJ1IjoieWFjb25zdHJ1Y3QiLCJhIjoiY2l6NDFpN3k1MDAyZjJxbHdhcHU2eHQ0ZyJ9.8TtgxnHPThgkyXRDGGYMlQ';

const loader = document.querySelector('.loader');

const mapZoomPanel = document.querySelector('.mapZoomPanel');
setTimeout(()=> {
  const mapOptions = {
    center: [37.7926037, -122.3957979],
    zoom: 5
  }

  mapZoomPanel.innerHTML = 'zoom: 5';

  const mainMap = new mapboxgl.Map({
    container: 'mainMap',
    style: 'mapbox://styles/mapbox/streets-v11', 
    center: [mapOptions.center[1], mapOptions.center[0]],
    zoom: mapOptions.zoom - 1
  });

  const mapboxMap = new mapboxgl.Map({
    container: 'mapboxMap',
    style: 'mapbox://styles/mapbox/streets-v11', 
    center: [mapOptions.center[1], mapOptions.center[0]],
    zoom: mapOptions.zoom - 1
  });
 
  const leafletMap = new L.map('osmMap', mapOptions);
  const layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
  
  leafletMap.addLayer(layer);
  
  const googleMap = new google.maps.Map(document.getElementById("googleMap"), {
    center: { lat: mapOptions.center[0], lng: mapOptions.center[1] },
    zoom: mapOptions.zoom,
    disableDefaultUI: true,
  });

  let yaMap;
  ymaps.ready(init);
  function init () {
    yaMap = new ymaps.Map('yaMap', {
      center: [ mapOptions.center[0], mapOptions.center[1]],
      zoom: mapOptions.zoom,
      controls: []
    });
  }

  const updateMapCenter = () => {
    const newCenter = mainMap.getCenter();
    
    mapboxMap.setCenter([newCenter.lng, newCenter.lat]);
    leafletMap.setView([newCenter.lat, newCenter.lng]);
    yaMap.setCenter([newCenter.lat, newCenter.lng]);
    googleMap.setCenter({lat:newCenter.lat, lng:newCenter.lng});
  };
  const updateMapZoom = () => {
    const newZoom = Math.ceil(mainMap.getZoom());
    
    mapboxMap.zoomTo(newZoom);
    leafletMap.setZoom(newZoom + 1);
    yaMap.setZoom(newZoom + 1);
    googleMap.setZoom(newZoom + 1);
    mapZoomPanel.innerHTML = `zoom: ${newZoom + 1}`;
  }

  mainMap.on('dragend', () => {
    updateMapCenter();
   
  });

  mainMap.on('zoom', () => {
    updateMapZoom();
  });

  loader.classList.add('loader--inactive');
}, 6000)

