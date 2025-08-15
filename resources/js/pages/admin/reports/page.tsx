import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { FileText } from 'lucide-react';
import { DateRangeFilter } from './date-filter'

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Reportes',
    href: '/admin/reports',
  },
];

// Rutas deben coincidir con las definidas en web.php
const reports = [
  {
    title: 'Citas del Mes',
    description: 'Reporte completo de todas las citas programadas en el período seleccionado',
    route: '/admin/reports/monthly',
  },
  {
    title: 'Ganancias por Citas',
    description: 'Análisis detallado de ingresos generados por servicios y citas',
    route: '/admin/reports/earnings',
  },
  {
    title: 'Citas Canceladas',
    description: 'Reporte de citas canceladas con motivos y análisis de tendencias',
    route: '/admin/reports/canceled',
  },
  {
    title: 'Citas Completadas',
    description: 'Resumen de servicios completados y satisfacción del cliente',
    route: '/admin/reports/completed',
  },
  {
    title: 'Análisis de Clientes',
    description: 'Estadísticas de clientes nuevos, recurrentes y comportamiento',
    route: '/admin/reports/clients',
  },
];

export default function ReportsDashboard() {
  const handleDownload = (route: string) => {
    // Abrir la ruta directamente para descargar Excel
    window.location.href = route;
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Reportes" />
      <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.map((report) => (
          <div
            key={report.title}
            className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 cursor-pointer hover:shadow-lg transition"
            onClick={() => handleDownload(report.route)}
          >
            <div className="flex items-center mb-4">
              <FileText className="w-6 h-6 text-purple-600 mr-2" />
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">{report.title}</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">{report.description}</p>
          </div>
        ))}
      </div>

      <div className='p-4'>
        <h3 className='p-1'>Reporte general de citas</h3>
        <DateRangeFilter />
      </div>
    </AppLayout>
  );
}
