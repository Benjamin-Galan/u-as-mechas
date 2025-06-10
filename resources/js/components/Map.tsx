"use client"

import { useEffect, useRef } from "react"

type MapProps = {
  apiKey: string
  address: string
  zoom?: number
  height?: string
  className?: string
}

// Declare google as a global variable
declare global {
  interface Window {
    google: any
  }
}

export default function Map({ apiKey, address, zoom = 16, height = "400px", className = "" }: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<google.maps.Map | null>(null)
  const markerRef = useRef<google.maps.Marker | null>(null)

  useEffect(() => {
    // Función para cargar el script de Google Maps
    const loadGoogleMapsScript = () => {
      // Verificar si el script ya está cargado
      if (window.google && window.google.maps) {
        initializeMap()
        return
      }

      // Crear el script
      const script = document.createElement("script")
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`
      script.async = true
      script.defer = true
      script.onload = initializeMap
      document.head.appendChild(script)

      return () => {
        // Limpiar el script si el componente se desmonta antes de que se cargue
        script.onload = null
      }
    }

    // Función para inicializar el mapa
    const initializeMap = () => {
      if (!mapRef.current) return

      // Crear una instancia del servicio de geocodificación
      const geocoder = new window.google.maps.Geocoder()

      // Geocodificar la dirección
      geocoder.geocode({ address }, (results, status) => {
        if (status === "OK" && results && results[0]) {
          const location = results[0].geometry.location

          // Crear el mapa
          const mapOptions: google.maps.MapOptions = {
            center: location,
            zoom,
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: true,
            zoomControl: true,
            styles: [
              {
                featureType: "poi",
                elementType: "labels",
                stylers: [{ visibility: "off" }],
              },
              {
                featureType: "administrative",
                elementType: "labels",
                stylers: [{ visibility: "on" }],
              },
              {
                featureType: "road",
                elementType: "labels",
                stylers: [{ visibility: "on" }],
              },
              {
                featureType: "landscape",
                elementType: "geometry",
                stylers: [{ color: "#f5f5f5" }],
              },
              {
                featureType: "water",
                elementType: "geometry",
                stylers: [{ color: "#c9c9c9" }],
              },
            ],
          }

          // Crear el mapa
          mapInstanceRef.current = new window.google.maps.Map(mapRef.current, mapOptions)

          // Crear el marcador
          markerRef.current = new window.google.maps.Marker({
            position: location,
            map: mapInstanceRef.current,
            title: "Uñas & Mechas",
            animation: window.google.maps.Animation.DROP,
            icon: {
              url: "https://maps.google.com/mapfiles/ms/icons/pink-dot.png",
            },
          })

          // Crear el InfoWindow
          const infoWindow = new window.google.maps.InfoWindow({
            content: `
              <div style="padding: 8px; max-width: 200px;">
                <h3 style="margin: 0 0 8px; font-weight: bold; color: #9370DB;">Uñas & Mechas</h3>
                <p style="margin: 0; font-size: 14px;">${address}</p>
              </div>
            `,
          })

          // Abrir el InfoWindow al hacer clic en el marcador
          markerRef.current.addListener("click", () => {
            infoWindow.open(mapInstanceRef.current, markerRef.current)
          })

          // Abrir el InfoWindow por defecto
          infoWindow.open(mapInstanceRef.current, markerRef.current)
        } else {
          console.error("Geocode was not successful for the following reason: " + status)
        }
      })
    }

    loadGoogleMapsScript()

    // Limpieza al desmontar
    return () => {
      if (markerRef.current) {
        markerRef.current.setMap(null)
      }
    }
  }, [apiKey, address, zoom])

  return <div ref={mapRef} className={`w-full ${className}`} style={{ height }} />
}
