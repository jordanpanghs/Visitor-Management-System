import React from "react";
import { Card, Typography } from "@material-tailwind/react";

function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-20">
      <Table />
    </div>
  );
}

function Table() {
  const data = [
    {
      id: 1,
      name: "John Doe",
      driverLicense: "123456789",
      licensePlate: "ABC123",
      telephone: "1234567890",
      address: "123 Main St",
      entryTime: "2021-10-10 10:00:00",
      exitTime: "2021-10-10 10:00:00",
      visitDate: "2021-10-10",
      visitedUnit: "B-123",
    },
  ];

  return (
    <Card className="overflow-scroll h-full w-full">
      <table className="w-full min-w-max table-auto text-left">
        <thead className="justify-left">
          <tr>
            <th className="px-4 py-2">Record No.</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Driver License Number</th>
            <th className="px-4 py-2">License Plate Number</th>
            <th className="px-4 py-2">Telephone Number</th>
            <th className="px-4 py-2">Address</th>
            <th className="px-4 py-2">Entry Time</th>
            <th className="px-4 py-2">Exit Time</th>
            <th className="px-4 py-2">Visit Date</th>
            <th className="px-4 py-2">Visited Unit</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td className="px-4 py-2">{item.id}</td>
              <td className="px-4 py-2">{item.name}</td>
              <td className="px-4 py-2">{item.driverLicense}</td>
              <td className="px-4 py-2">{item.licensePlate}</td>
              <td className="px-4 py-2">{item.telephone}</td>
              <td className="px-4 py-2">{item.address}</td>
              <td className="px-4 py-2">{item.entryTime}</td>
              <td className="px-4 py-2">{item.exitTime}</td>
              <td className="px-4 py-2">{item.visitDate}</td>
              <td className="px-4 py-2">{item.visitedUnit}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}

export default Home;
