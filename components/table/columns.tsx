"use client";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

import AppointmentModal from "../AppointmentModal";
import StatusBadge from "../StatusBadge";
import { formatDateTime } from "@/lib/utils";
import { Doctors } from "@/constants";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string;
  patient: { name: string };
  amount: number;
  status: "pending" | "scheduled" | "cancelled";
  schedule: string;
  primaryPhysician: string;
};

export const columns: ColumnDef<Payment>[] = [
  {
    header: "ID",
    cell: ({ row }) => <p className="text-14-medium">{row.index + 1}</p>,
  },
  {
    accessorKey: "patient",
    header: "Patient",
    cell: ({ row }) => {
      return <p className="text-14-medium">{row.original.patient.name}</p>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="min-w-[115px">
        <StatusBadge status={row.original.status} />
      </div>
    ),
  },
  {
    accessorKey: "schedule",
    header: "Appointment",
    cell: ({ row }) => (
      <p className="text-14-regular min-w-[100px]">
        {formatDateTime(row.original.schedule).dateTime}
      </p>
    ),
  },
  {
    accessorKey: "primaryPhysician",
    header: () => "Doctor",
    cell: ({ row }) => {
      const doctor = Doctors.find(
        (doc) => doc.name === row.original.primaryPhysician
      );
      return (
        <div className="flex items-center gap-3">
          <Image
            className="size-8"
            src={doctor?.image!}
            height={100}
            width={100}
            alt={doctor?.name!}
          />
          <p className="whitespace-nowrap">Dr. {doctor?.name}</p>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="pl-4">Actions</div>,
    cell: ({ row }) => {
      return (
        <div className="flex gap-1">
          <AppointmentModal type="schedule" />
          <AppointmentModal type="cancel" />
        </div>
      );
      // const payment = row.original;

      // return (
      //   <DropdownMenu>
      //     <DropdownMenuTrigger asChild>
      //       <Button variant="ghost" className="h-8 w-8 p-0">
      //         <span className="sr-only">Open menu</span>
      //         <MoreHorizontal className="h-4 w-4" />
      //       </Button>
      //     </DropdownMenuTrigger>
      //     <DropdownMenuContent align="end">
      //       <DropdownMenuLabel>Actions</DropdownMenuLabel>
      //       <DropdownMenuItem
      //         onClick={() => navigator.clipboard.writeText(payment.id)}
      //       >
      //         Copy payment ID
      //       </DropdownMenuItem>
      //       <DropdownMenuSeparator />
      //       <DropdownMenuItem>View customer</DropdownMenuItem>
      //       <DropdownMenuItem>View payment details</DropdownMenuItem>
      //     </DropdownMenuContent>
      //   </DropdownMenu>
      // );
    },
  },
];
