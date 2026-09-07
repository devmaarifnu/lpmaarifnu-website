import { getSatpenById } from '@/lib/api';

export async function generateMetadata({ params }) {
  const { id } = await params;
  try {
    const satpen = await getSatpenById(id);
    if (!satpen) return { title: 'Satuan Pendidikan Tidak Ditemukan' };
    return {
      title: satpen.nama,
      description: `Detail satuan pendidikan ${satpen.nama} - ${satpen.jenjang?.nama || ''}, ${satpen.kabupaten?.nama || ''}, ${satpen.provinsi?.nama || ''}`,
    };
  } catch {
    return { title: 'Detail Satuan Pendidikan' };
  }
}

export default function SatpenDetailLayout({ children }) {
  return children;
}
