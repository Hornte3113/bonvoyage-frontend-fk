"use client";

import { useState } from "react";
import { IoAirplane, IoSwapHorizontal, IoSearch, IoChevronDown } from "react-icons/io5";

type Destination = {
  name: string;
  country: string;
  lat: number;
  lng: number;
  photoUrl: string | null;
};

type TripType = "ida-vuelta" | "solo-ida" | "multidestino";

type Props = {
  destination: Destination;
};

export default function FlightsSection({ destination }: Props) {
  const [tripType, setTripType] = useState<TripType>("ida-vuelta");
  const [origin, setOrigin] = useState("");
  const [dest, setDest] = useState(
    destination.country ? `${destination.name}, ${destination.country}` : destination.name
  );
  const [departDate, setDepartDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [passengers, setPassengers] = useState(1);
  const [cabinClass, setCabinClass] = useState("economy");
  const [searched, setSearched] = useState(false);

  function swapLocations() {
    setOrigin(dest);
    setDest(origin);
  }

  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSearched(true);
  }

  return (
    <div>
      {/* Search card — overlaps the hero image */}
      <div className="-mt-12 relative z-10 px-4 max-w-5xl mx-auto mb-6">
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-5">

          {/* Trip type selector */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
              {(["ida-vuelta", "solo-ida", "multidestino"] as TripType[]).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setTripType(type)}
                  className={`px-4 py-1.5 rounded-md text-xs font-medium transition-colors ${
                    tripType === type
                      ? "bg-white text-gray-800 shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {type === "ida-vuelta" ? "Ida y vuelta" : type === "solo-ida" ? "Solo ida" : "Multidestino"}
                </button>
              ))}
            </div>
          </div>

          {/* Horizontal fields row */}
          <form onSubmit={handleSearch}>
            <div className="flex items-stretch rounded-xl border border-gray-200 overflow-hidden">

              {/* Origen */}
              <div className="flex-1 min-w-0 px-4 py-3 hover:bg-gray-50 transition-colors">
                <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
                  Origen
                </label>
                <div className="flex items-center gap-2">
                  <IoAirplane className="text-gray-400 flex-shrink-0 rotate-45" />
                  <input
                    type="text"
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                    placeholder="Ciudad de salida"
                    required
                    className="w-full bg-transparent text-sm text-gray-800 placeholder:text-gray-300 outline-none"
                  />
                </div>
              </div>

              {/* Swap */}
              <div className="flex items-center px-2 border-x border-gray-200 bg-white">
                <button
                  type="button"
                  onClick={swapLocations}
                  className="p-1.5 rounded-full hover:bg-gray-100 transition-colors text-gray-400 hover:text-blue-500"
                >
                  <IoSwapHorizontal className="text-lg" />
                </button>
              </div>

              {/* Destino */}
              <div className="flex-1 min-w-0 px-4 py-3 border-r border-gray-200 hover:bg-gray-50 transition-colors">
                <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
                  Destino
                </label>
                <div className="flex items-center gap-2">
                  <IoAirplane className="text-gray-400 flex-shrink-0" />
                  <input
                    type="text"
                    value={dest}
                    onChange={(e) => setDest(e.target.value)}
                    placeholder="Ciudad de destino"
                    required
                    className="w-full bg-transparent text-sm text-gray-800 placeholder:text-gray-300 outline-none"
                  />
                </div>
              </div>

              {/* Salida */}
              <div className="px-4 py-3 border-r border-gray-200 hover:bg-gray-50 transition-colors">
                <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
                  Salida
                </label>
                <input
                  type="date"
                  value={departDate}
                  onChange={(e) => setDepartDate(e.target.value)}
                  required
                  className="bg-transparent text-sm text-gray-800 outline-none w-32"
                />
              </div>

              {/* Regreso */}
              <div className="px-4 py-3 border-r border-gray-200 hover:bg-gray-50 transition-colors">
                <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
                  Regreso
                </label>
                <input
                  type="date"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  disabled={tripType === "solo-ida"}
                  className="bg-transparent text-sm text-gray-800 outline-none w-32 disabled:opacity-30 disabled:cursor-not-allowed"
                />
              </div>

              {/* Pasajeros + Clase voy a checar bien bien que pide la api */}
              <div className="px-4 py-3 border-r border-gray-200 hover:bg-gray-50 transition-colors">
                <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
                  Pasajeros · Clase
                </label>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <select
                      value={passengers}
                      onChange={(e) => setPassengers(Number(e.target.value))}
                      className="bg-transparent text-sm text-gray-800 outline-none appearance-none pr-4 cursor-pointer"
                    >
                      {[1, 2, 3, 4, 5, 6].map((n) => (
                        <option key={n} value={n}>{n} {n === 1 ? "pasajero" : "pasajeros"}</option>
                      ))}
                    </select>
                    <IoChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 text-xs pointer-events-none" />
                  </div>
                  <span className="text-gray-300">·</span>
                  <div className="relative">
                    <select
                      value={cabinClass}
                      onChange={(e) => setCabinClass(e.target.value)}
                      className="bg-transparent text-sm text-gray-800 outline-none appearance-none pr-4 cursor-pointer"
                    >
                      <option value="economy">Económica</option>
                      <option value="premium">Premium</option>
                      <option value="business">Business</option>
                      <option value="first">Primera</option>
                    </select>
                    <IoChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 text-xs pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Search button */}
              <button
                type="submit"
                className="flex items-center gap-2 px-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold text-sm transition-colors flex-shrink-0"
              >
                <IoSearch className="text-lg" />
                Buscar
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Results placeholder */}
      {searched && (
        <div className="max-w-5xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 text-center">
            <IoAirplane className="text-5xl text-blue-200 mx-auto mb-4" />
            <p className="text-gray-500 text-sm">Búsqueda de vuelos disponible próximamente.</p>
            <p className="text-gray-400 text-xs mt-1">
              {origin} → {dest} · {passengers} {passengers === 1 ? "pasajero" : "pasajeros"} · {cabinClass}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
