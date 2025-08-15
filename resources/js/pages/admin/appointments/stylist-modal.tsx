import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { router } from "@inertiajs/react";
import { Appointment, Staff } from "@/types";

interface Props {
    open: boolean;
    onCancel: () => void;
    selectedClient?: Appointment;
}

export const StylistsModal = ({ open, onCancel, selectedClient }: Props) => {
    const [stylists, setStylists] = useState<Staff[]>([]);
    const [selectedStylistId, setSelectedStylistId] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (open) {
            axios.get('/admin/appointments/available-staff')
                .then(response => {
                    setStylists(response.data.available_staff || []);
                    setSelectedStylistId(null);
                    setError(null);
                })
                .catch(err => {
                    console.error(err);
                    setError("No se pudieron cargar los estilistas.");
                });
        }
    }, [open]);

    const handleAssign = () => {
        if (!selectedStylistId || !selectedClient) return;

        setLoading(true);
        setError(null);

        router.post(route('appointments.assign-stylist', selectedClient.id), {
            staff_id: selectedStylistId,
        }, {
            onSuccess: () => {
                setLoading(false);
                onCancel(); // cerrar modal al asignar
            },
            onError: (errors) => {
                setLoading(false);
                setError(errors.staff || "Error al asignar el estilista.");
            }
        });
    };

    return (
        <Dialog open={open} onOpenChange={onCancel}>
            <DialogContent className="max-w-xl w-full p-5">
                <DialogHeader>
                    <DialogTitle>Seleccionar Estilista</DialogTitle>
                </DialogHeader>

                <select
                    id="stylist"
                    className="w-full rounded border px-3 py-2 mb-4 bg-white text-black dark:bg-zinc-800 dark:text-white border-zinc-300 dark:border-zinc-600 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    value={selectedStylistId ?? ""}
                    onChange={(e) => setSelectedStylistId(Number(e.target.value))}
                >
                    <option value="" disabled>
                        Selecciona un estilista
                    </option>
                    {stylists.map((stylist) => (
                        <option key={stylist.id} value={stylist.id}>
                            {stylist.name}
                        </option>
                    ))}
                </select>

                {error && <p className="text-red-500 mb-2">{error}</p>}

                <DialogFooter className="flex justify-between">
                    <Button variant="secondary" onClick={onCancel} disabled={loading}>
                        Cerrar
                    </Button>
                    <Button onClick={handleAssign} disabled={!selectedStylistId || loading}>
                        {loading ? "Asignando..." : "Asignar Estilista"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
