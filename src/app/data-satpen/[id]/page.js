import { getSatpenById } from '@/lib/api';
import { notFound } from 'next/navigation';
import {
  ArrowLeft, Building2, MapPin, User, Award,
  Calendar, Users, GraduationCap, Hash, CheckCircle, Clock,
} from 'lucide-react';
import BatikPattern from '@/components/shared/BatikPattern';

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

function InfoRow({ icon: Icon, label, value }) {
  if (!value) return null;
  return (
    <div className="flex gap-3">
      <div className="mt-0.5 shrink-0">
        <Icon className="w-4 h-4 text-teal-600" />
      </div>
      <div>
        <p className="text-xs text-neutral-500 mb-0.5">{label}</p>
        <p className="text-sm font-medium text-neutral-900">{value}</p>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon: Icon }) {
  if (!value) return null;
  return (
    <div className="bg-teal-50 rounded-lg p-4 text-center">
      <Icon className="w-6 h-6 text-teal-600 mx-auto mb-1" />
      <div className="text-2xl font-bold text-teal-700">
        {Number(value).toLocaleString('id-ID')}
      </div>
      <div className="text-xs text-teal-600 mt-0.5">{label}</div>
    </div>
  );
}

const STATUS_CONFIG = {
  setujui:           { label: 'Terverifikasi',      color: 'bg-green-100 text-green-800' },
  permohonan:        { label: 'Permohonan',          color: 'bg-blue-100 text-blue-800' },
  revisi:            { label: 'Perlu Revisi',        color: 'bg-yellow-100 text-yellow-800' },
  'proses dokumen':  { label: 'Proses Dokumen',      color: 'bg-purple-100 text-purple-800' },
  perpanjangan:      { label: 'Perpanjangan',        color: 'bg-orange-100 text-orange-800' },
  expired:           { label: 'Expired',             color: 'bg-red-100 text-red-800' },
};

export default async function SatpenDetailPage({ params }) {
  const { id } = await params;
  const satpen = await getSatpenById(id);

  if (!satpen) notFound();

  const statusCfg = STATUS_CONFIG[satpen.status] || { label: satpen.status, color: 'bg-gray-100 text-gray-800' };
  const alamatLengkap = [satpen.alamat, satpen.kelurahan, satpen.kecamatan, satpen.kabupaten?.nama, satpen.provinsi?.nama]
    .filter(Boolean).join(', ');

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero */}
      <section className="relative bg-gradient-to-r from-teal-700 to-teal-500 text-white py-12 md:py-16 overflow-hidden">
        <BatikPattern opacity={0.15} />
        <div className="container mx-auto relative z-10">
          <a
            href="/data-satpen"
            className="inline-flex items-center gap-2 text-teal-100 hover:text-white text-sm mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Data Satpen
          </a>

          <div className="flex flex-wrap items-start gap-4">
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-semibold">
                  {satpen.jenjang?.nama || '-'}
                </span>
                {satpen.akreditasi && (
                  <span className="flex items-center gap-1 px-3 py-1 bg-yellow-400/30 text-yellow-100 rounded-full text-sm font-semibold">
                    <Award className="w-3.5 h-3.5" />
                    Akreditasi {satpen.akreditasi}
                  </span>
                )}
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${satpenStatusBadge(satpen.status)}`}>
                  {satpen.status === 'setujui' ? (
                    <span className="flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5" /> Terverifikasi</span>
                  ) : statusCfg.label}
                </span>
              </div>

              <h1 className="text-2xl md:text-3xl font-bold mb-2 leading-tight">
                {satpen.nama}
              </h1>
              <p className="text-teal-100 flex items-center gap-1.5 text-sm">
                <MapPin className="w-4 h-4 shrink-0" />
                {alamatLengkap}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="container mx-auto py-10 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Main Info */}
          <div className="lg:col-span-2 space-y-6">

            {/* Statistik */}
            {(satpen.jumlah_siswa > 0 || satpen.jumlah_guru > 0) && (
              <div className="bg-white rounded-xl shadow-sm p-6 border border-neutral-200">
                <h2 className="text-lg font-bold text-neutral-900 mb-4">Statistik</h2>
                <div className="grid grid-cols-2 gap-4">
                  <StatCard label="Siswa" value={satpen.jumlah_siswa} icon={Users} />
                  <StatCard label="Guru" value={satpen.jumlah_guru} icon={GraduationCap} />
                </div>
              </div>
            )}

            {/* Informasi Umum */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-neutral-200">
              <h2 className="text-lg font-bold text-neutral-900 mb-4">Informasi Umum</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <InfoRow icon={Hash} label="NPSN" value={satpen.npsn} />
                <InfoRow icon={Hash} label="No. Registrasi" value={satpen.no_registrasi} />
                <InfoRow icon={Building2} label="Nama Yayasan" value={satpen.yayasan} />
                <InfoRow icon={Calendar} label="Tahun Berdiri" value={satpen.tahun_berdiri?.toString()} />
                <InfoRow icon={User} label="Kepala Sekolah" value={satpen.kepala_sekolah} />
                <InfoRow icon={User} label="Nama Pemilik" value={satpen.nama_pemilik} />
              </div>
            </div>

            {/* Alamat */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-neutral-200">
              <h2 className="text-lg font-bold text-neutral-900 mb-4">Alamat</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="sm:col-span-2">
                  <InfoRow icon={MapPin} label="Alamat Lengkap" value={satpen.alamat} />
                </div>
                <InfoRow icon={MapPin} label="Kelurahan/Desa" value={satpen.kelurahan} />
                <InfoRow icon={MapPin} label="Kecamatan" value={satpen.kecamatan} />
                <InfoRow icon={MapPin} label="Kabupaten/Kota" value={satpen.kabupaten?.nama} />
                <InfoRow icon={MapPin} label="Provinsi" value={satpen.provinsi?.nama} />
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">

            {/* Pengurus Cabang */}
            {satpen.pengurus_cabang && (
              <div className="bg-white rounded-xl shadow-sm p-6 border border-neutral-200">
                <h2 className="text-base font-bold text-neutral-900 mb-3">Pengurus Cabang</h2>
                <p className="text-sm text-neutral-700">{satpen.pengurus_cabang.nama}</p>
              </div>
            )}

            {/* Status & Info Lain */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-neutral-200">
              <h2 className="text-base font-bold text-neutral-900 mb-4">Status & Registrasi</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-neutral-500 mb-1">Status</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${statusCfg.color}`}>
                    {statusCfg.label}
                  </span>
                </div>
                {satpen.tanggal_registrasi && (
                  <InfoRow
                    icon={Clock}
                    label="Tanggal Registrasi"
                    value={new Date(satpen.tanggal_registrasi).toLocaleDateString('id-ID', {
                      day: 'numeric', month: 'long', year: 'numeric',
                    })}
                  />
                )}
                {satpen.aset_tanah && (
                  <InfoRow icon={Building2} label="Aset Tanah" value={satpen.aset_tanah} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper: badge color yang bisa digunakan dalam JSX (tidak bisa memakai objek langsung di template literal)
function satpenStatusBadge(status) {
  const map = {
    setujui:          'bg-green-400/30 text-green-100',
    permohonan:       'bg-blue-400/30 text-blue-100',
    revisi:           'bg-yellow-400/30 text-yellow-100',
    'proses dokumen': 'bg-purple-400/30 text-purple-100',
    perpanjangan:     'bg-orange-400/30 text-orange-100',
    expired:          'bg-red-400/30 text-red-100',
  };
  return map[status] || 'bg-white/20 text-white';
}
