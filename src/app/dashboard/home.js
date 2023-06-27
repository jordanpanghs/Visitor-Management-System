"use client"; //Temporary, will have to put data into state

import React from "react";
import { Card, Typography } from "@material-tailwind/react";

function Home() {
  return (
    <div className="flex flex-col justify-start min-h-screen px-20 py-10">
      <Table />
    </div>
  );
}

function Table() {
  const TABLE_HEAD = [
    "Record No.",
    "Name",
    "Driver License Number",
    "License Plate Number",
    "Telephone Number",
    "Address",
    "Entry Time",
    "Exit Time",
    "Visit Date",
    "Visited Unit",
    "",
  ];
  const TABLE_ROWS_DATA = [
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
    {
      id: 2,
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
    {
      id: 3,
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
    {
      id: 4,
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
    {
      id: 5,
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
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th
                key={head}
                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {TABLE_ROWS_DATA.map(
            (
              {
                id,
                name,
                driverLicense,
                licensePlate,
                telephone,
                address,
                entryTime,
                exitTime,
                visitDate,
                visitedUnit,
              },
              index
            ) => (
              <tr key={name} className="even:bg-blue-gray-50/50">
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {id}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {name}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {driverLicense}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {licensePlate}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {telephone}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {address}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {entryTime}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {exitTime}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {visitDate}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {visitedUnit}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    as="a"
                    href="#"
                    variant="small"
                    color="blue"
                    className="font-medium"
                  >
                    Edit
                  </Typography>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </Card>
  );
}

export default Home;
