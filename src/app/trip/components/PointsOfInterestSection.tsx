"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { IoStar, IoLocationSharp, IoCompass, IoPricetag } from "react-icons/io5";

const POIMap = dynamic(() => import("./POIMap"), { ssr: false });

type POI = {
  id: string;
  name: string;
  address: string;
  rating: number | null;
  ratingCount: number | null;
  priceLevel: string | null;
  description: string | null;
  photoUrl: string | null;
  lat: number;
  lng: number;
};

type Destination = {
  name: string;
  country: string;
  lat: number;
  lng: number;
  photoUrl: string | null;
};

export default function PointsOfInterestSection({ destination }: { destination: Destination }) {
  const [places, setPlaces] = useState<POI[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPOIs() {
      setLoading(true);
      try {
        const res = await fetch(`/api/poi?lat=${destination.lat}&lng=${destination.lng}`);
        const data = await res.json();
        setPlaces(data.places ?? []);
        if (data.places?.length > 0) setSelectedId(data.places[0].id);
      } catch {
        setPlaces([]);
      } finally {
        setLoading(false);
      }
    }
    fetchPOIs();
  }, [destination.lat, destination.lng]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96 gap-3 text-gray-400">
        <IoCompass className="text-3xl animate-spin" />
        <span className="text-sm">Buscando puntos de interés...</span>
      </div>
    );
  }

  if (places.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-96 gap-3 text-gray-400">
        <IoCompass className="text-5xl text-gray-200" />
        <p className="text-sm">No se encontraron puntos de interés cerca de {destination.name}.</p>
      </div>
    );
  }

  return (
    <div className="flex gap-5 px-4 max-w-6xl mx-auto pt-6 pb-8">
      {/* Left — scrollable cards */}
      <div className="w-80 flex-shrink-0 space-y-3 overflow-y-auto max-h-[620px] pr-1">
        <p className="text-xs text-gray-400 uppercase tracking-wider font-medium mb-2">
          {places.length} lugares encontrados
        </p>
        {places.map((poi) => (
          <POICard
            key={poi.id}
            poi={poi}
            selected={selectedId === poi.id}
            onClick={() => setSelectedId(poi.id)}
          />
        ))}
      </div>

      {/* Right — sticky map */}
      <div className="flex-1 sticky top-16 h-[620px] rounded-2xl overflow-hidden shadow-md border border-gray-100">
        <POIMap
          places={places}
          selectedId={selectedId}
          onSelectId={setSelectedId}
          center={{ lat: destination.lat, lng: destination.lng }}
        />
      </div>
    </div>
  );
}

function POICard({
  poi,
  selected,
  onClick,
}: {
  poi: POI;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left bg-white rounded-xl overflow-hidden shadow-sm border transition-all duration-200 ${
        selected
          ? "border-blue-500 shadow-md ring-1 ring-blue-200"
          : "border-gray-100 hover:border-gray-300 hover:shadow"
      }`}
    >
      {/* Image */}
      <div className="w-full h-36 bg-gray-100 overflow-hidden">
        {poi.photoUrl ? (
          <img
            src={poi.photoUrl}
            alt={poi.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-50">
            <IoCompass className="text-4xl text-gray-200" />
          </div>
        )}
      </div>

      <div className="p-3">
        {/* Rating + Price */}
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-1">
            {poi.rating && (
              <>
                <IoStar className="text-amber-400 text-xs" />
                <span className="text-xs font-semibold text-gray-700">
                  {poi.rating.toFixed(1)}
                </span>
                {poi.ratingCount && (
                  <span className="text-[10px] text-gray-400">
                    ({poi.ratingCount.toLocaleString()})
                  </span>
                )}
              </>
            )}
          </div>
          {poi.priceLevel && (
            <div className="flex items-center gap-1 text-gray-500">
              <IoPricetag className="text-[10px]" />
              <span className="text-xs font-medium">{poi.priceLevel}</span>
            </div>
          )}
        </div>

        {/* Name */}
        <h3 className="font-semibold text-gray-800 text-sm leading-tight line-clamp-1">
          {poi.name}
        </h3>

        {/* Description */}
        {poi.description && (
          <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">
            {poi.description}
          </p>
        )}

        {/* Address */}
        <div className="flex items-start gap-1 mt-2">
          <IoLocationSharp className="text-gray-400 text-[11px] flex-shrink-0 mt-0.5" />
          <p className="text-[10px] text-gray-400 line-clamp-1">{poi.address}</p>
        </div>
      </div>
    </button>
  );
}
