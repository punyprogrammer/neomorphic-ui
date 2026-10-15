"use client";

import { ScrollArea } from "@neomorphic-react/ui/scroll-area";

const stations = [
  "Porto Campanhã",
  "Vila Nova de Gaia",
  "Espinho",
  "Aveiro",
  "Coimbra-B",
  "Pombal",
  "Entroncamento",
  "Santarém",
  "Lisboa Oriente",
  "Lisboa Santa Apolónia",
];

const departures = ["06:39", "07:52", "09:09", "10:52", "12:39", "14:52"];

function addMinutes(time: string, minutes: number) {
  const [hours = 0, mins = 0] = time.split(":").map(Number);
  const total = hours * 60 + mins + minutes;
  return `${String(Math.floor(total / 60) % 24).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`;
}

export default function ScrollAreaBoth() {
  return (
    <ScrollArea
      className="inset-shadow-neu-sm h-64 w-full max-w-md rounded-xl bg-background shadow-neu-flat"
      orientation="both"
    >
      <table className="w-max border-separate border-spacing-x-4 border-spacing-y-2 p-2 text-sm">
        <thead>
          <tr className="text-muted-foreground">
            <th className="text-start font-medium">Station</th>
            {departures.map((time) => (
              <th className="font-medium" key={time}>
                Train {time}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {stations.map((station, row) => (
            <tr key={station}>
              <th className="whitespace-nowrap text-start font-normal">
                {station}
              </th>
              {departures.map((time) => (
                <td className="text-center tabular-nums" key={time}>
                  {addMinutes(time, row * 17)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </ScrollArea>
  );
}
