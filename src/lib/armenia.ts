export type RegionId =
  | "yerevan" | "shirak" | "lori" | "tavush" | "aragatsotn" | "kotayk"
  | "gegharkunik" | "armavir" | "ararat" | "vayots-dzor" | "syunik";

export const regions: { id: RegionId; name: string; points: string; courts: number; players: number; avgAccuracy: number }[] = [
  { id: "shirak", name: "Shirak", points: "20,20 90,10 100,80 60,110 20,100", courts: 9, players: 640, avgAccuracy: 47 },
  { id: "lori", name: "Lori", points: "90,10 170,15 175,70 130,90 100,80", courts: 8, players: 590, avgAccuracy: 46 },
  { id: "tavush", name: "Tavush", points: "170,15 240,30 250,90 200,110 175,70", courts: 4, players: 260, avgAccuracy: 43 },
  { id: "aragatsotn", name: "Aragatsotn", points: "20,100 60,110 100,80 130,90 125,150 80,165 35,150", courts: 3, players: 180, avgAccuracy: 41 },
  { id: "kotayk", name: "Kotayk", points: "130,90 175,70 185,130 160,165 135,160 125,150", courts: 7, players: 470, avgAccuracy: 45 },
  { id: "gegharkunik", name: "Gegharkunik", points: "175,70 200,110 250,90 270,150 250,210 200,220 185,130", courts: 4, players: 290, avgAccuracy: 42 },
  { id: "yerevan", name: "Yerevan", points: "125,150 135,160 140,180 120,185 112,165", courts: 48, players: 4120, avgAccuracy: 52 },
  { id: "armavir", name: "Armavir", points: "35,150 80,165 112,165 120,185 95,205 40,195", courts: 5, players: 340, avgAccuracy: 44 },
  { id: "ararat", name: "Ararat", points: "120,185 140,180 135,160 160,165 185,180 175,230 130,240 95,205", courts: 5, players: 310, avgAccuracy: 43 },
  { id: "vayots-dzor", name: "Vayots Dzor", points: "185,130 200,220 250,210 245,255 180,255 175,230 185,180 160,165", courts: 2, players: 90, avgAccuracy: 40 },
  { id: "syunik", name: "Syunik", points: "180,255 245,255 250,210 270,240 265,330 240,390 215,380 205,300", courts: 6, players: 380, avgAccuracy: 45 },
];

export const regionName = (id: RegionId) => regions.find((r) => r.id === id)!.name;

export type Player = { name: string; region: RegionId; points: number; games: number };

export const players: Player[] = [
  { name: "Aram Petrosyan", region: "yerevan", points: 2840, games: 112 },
  { name: "Davit Hakobyan", region: "yerevan", points: 2715, games: 98 },
  { name: "Narek Sargsyan", region: "shirak", points: 2650, games: 104 },
  { name: "Levon Grigoryan", region: "lori", points: 2590, games: 91 },
  { name: "Tigran Avetisyan", region: "yerevan", points: 2520, games: 87 },
  { name: "Gor Harutyunyan", region: "kotayk", points: 2440, games: 95 },
  { name: "Hayk Mkrtchyan", region: "syunik", points: 2380, games: 79 },
  { name: "Armen Vardanyan", region: "shirak", points: 2310, games: 83 },
  { name: "Erik Khachatryan", region: "armavir", points: 2250, games: 76 },
  { name: "Samvel Karapetyan", region: "ararat", points: 2190, games: 72 },
  { name: "Vahe Simonyan", region: "gegharkunik", points: 2120, games: 69 },
  { name: "Arsen Manukyan", region: "tavush", points: 2060, games: 64 },
  { name: "Karen Ghazaryan", region: "lori", points: 2010, games: 70 },
  { name: "Ashot Poghosyan", region: "aragatsotn", points: 1950, games: 58 },
  { name: "Mher Abrahamyan", region: "vayots-dzor", points: 1880, games: 52 },
  { name: "Ruben Davtyan", region: "kotayk", points: 1840, games: 61 },
  { name: "Edgar Stepanyan", region: "syunik", points: 1790, games: 55 },
  { name: "Artur Melkonyan", region: "gegharkunik", points: 1720, games: 49 },
  { name: "Sergey Martirosyan", region: "armavir", points: 1680, games: 47 },
  { name: "Vardan Galstyan", region: "ararat", points: 1630, games: 44 },
  { name: "Arman Hovhannisyan", region: "tavush", points: 1570, games: 41 },
  { name: "Gevorg Asatryan", region: "aragatsotn", points: 1510, games: 39 },
  { name: "Suren Babayan", region: "vayots-dzor", points: 1450, games: 36 },
];

export const formatAmd = (n: number) => `${n.toLocaleString("en-US")} AMD`;
