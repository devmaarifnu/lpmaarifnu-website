'use client';

import OrgNode from './OrgNode';
import { ArrowRight, ArrowDown } from 'lucide-react';

/**
 * Organization Chart Component
 * Displays hierarchical organization structure with connecting lines and arrows
 */
export default function OrgChart() {
  return (
    <div className="w-full overflow-x-auto py-8">
      <div className="flex flex-col gap-0 items-center min-w-[900px] mx-auto max-w-[1000px]">
        {/* Level 1: PBNU => LP Ma'arif NU PBNU */}
        <div className="flex items-center justify-center gap-6">
          <OrgNode
            title="PBNU"
            subtitle="Pengurus Besar NU"
            variant="primary"
          />
          <ArrowRight className="w-10 h-10 text-primary-600 flex-shrink-0" />
          <OrgNode
            title="LP Ma'arif NU PBNU"
            subtitle="Lembaga Pendidikan Tingkat Pusat"
            variant="secondary"
          />
        </div>

        {/* Vertical Arrow Down from LP Ma'arif NU PBNU */}
        <div className="flex justify-center w-full">
          <div className="w-[240px]"></div> {/* Space for left node */}
          <div className="w-10"></div> {/* Space for horizontal arrow */}
          <div className="flex flex-col items-center py-2">
            <ArrowDown className="w-8 h-8 text-primary-600" />
          </div>
        </div>

        {/* Level 2: PWNU => LP Ma'arif NU PWNU */}
        <div className="flex items-center justify-center gap-6">
          <OrgNode
            title="PWNU"
            subtitle="Pengurus Wilayah NU"
            variant="tertiary"
          />
          <ArrowRight className="w-10 h-10 text-primary-600 flex-shrink-0" />
          <OrgNode
            title="LP Ma'arif NU PWNU"
            subtitle="Lembaga Pendidikan Tingkat Provinsi"
            variant="secondary"
          />
        </div>

        {/* Vertical Arrow Down from LP Ma'arif NU PWNU */}
        <div className="flex justify-center w-full">
          <div className="w-[240px]"></div> {/* Space for left node */}
          <div className="w-10"></div> {/* Space for horizontal arrow */}
          <div className="flex flex-col items-center py-2">
            <ArrowDown className="w-8 h-8 text-primary-600" />
          </div>
        </div>

        {/* Level 3: PCNU => LP Ma'arif NU PCNU */}
        <div className="flex items-center justify-center gap-6">
          <OrgNode
            title="PCNU"
            subtitle="Pengurus Cabang NU"
            variant="tertiary"
          />
          <ArrowRight className="w-10 h-10 text-primary-600 flex-shrink-0" />
          <OrgNode
            title="LP Ma'arif NU PCNU"
            subtitle="Lembaga Pendidikan Tingkat Kabupaten/Kota"
            variant="secondary"
          />
        </div>

        {/* Vertical Arrow Down from LP Ma'arif NU PCNU */}
        <div className="flex justify-center w-full">
          <div className="w-[240px]"></div> {/* Space for left node */}
          <div className="w-10"></div> {/* Space for horizontal arrow */}
          <div className="flex flex-col items-center py-2">
            <ArrowDown className="w-8 h-8 text-primary-600" />
          </div>
        </div>

        {/* Level 4: Satuan Pendidikan (centered under LP Ma'arif column) */}
        <div className="flex items-center justify-center">
          <div className="w-[240px]"></div> {/* Space for left column alignment */}
          <div className="w-10"></div> {/* Space for horizontal arrow */}
          <OrgNode
            title="Satuan Pendidikan Ma'arif NU"
            subtitle="PAUD, RA, MI, MTs, MA, SMK, Pesantren"
            variant="quaternary"
          />
        </div>
      </div>
    </div>
  );
}
