"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export function DateRangeFilter() {
    const [startDate, setStartDate] = useState<string | undefined>();
    const [endDate, setEndDate] = useState<string | undefined>();

    const today = new Date().toISOString().split("T")[0]; // yyyy-mm-dd

    const handleDownload = () => {
        if (!startDate || !endDate) return;
        const url = `/admin/reports/by-date?start_date=${startDate}&end_date=${endDate}`;
        window.location.href = url; // fuerza la descarga
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div className="space-y-2">
                <Label>Fecha Inicio</Label>
                <Input
                    type="date"
                    max={today}
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                />
            </div>

            <div className="space-y-2">
                <Label>Fecha Fin</Label>
                <Input
                    type="date"
                    max={today}
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                />
            </div>

            <Button className="mt-1" onClick={handleDownload}>
                Descargar Reporte
            </Button>
        </div>
    );
}
