/**
 * Navigation menu configuration
 * @type {Array<{label: string, href?: string, children?: Array}>}
 */
export const menuConfig = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'Tentang Kami',
    children: [
      { label: 'Sejarah', href: '/tentang/sejarah' },
      { label: 'Visi-Misi', href: '/tentang/visi-misi' },
      { label: 'Struktur Organisasi', href: '/tentang/struktur-organisasi' },
      { label: 'Susunan Pengurus', href: '/tentang/susunan-pengurus' },
      { label: 'Susunan Redaktur', href: '/tentang/susunan-redaktur' },
      { label: 'Program Strategis', href: '/tentang/program-strategis' },
      { label: 'Kontak', href: '/kontak' },
    ],
  },
  {
    label: 'Berita',
    children: [
      { label: 'Nasional', href: '/berita/nasional' },
      { label: 'Daerah', href: '/berita/daerah' },
    ],
  },
  {
    label: 'Opini',
    href: '/opini',
  },
  {
    label: 'Pramuka',
    href: '/pramuka',
  },
  {
    label: 'Data Satpen',
    href: '/data-satpen',
  },
  {
    label: 'Dokumen',
    href: '/dokumen',
  },
];
