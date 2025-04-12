'use client';

import { ChevronDown, ChevronRight } from 'lucide-react';

import NavItem from '../NavItem';
import { PATHS } from '@/constants/path';
import Text from '../Text';
import useAdminStatus from '@/hooks/useAdminStatus';
import { useState } from 'react';

const ADMIN_NAV_OPTIONS = [
  { label: 'home', path: PATHS.ADMIN.HOME },
  { label: 'users', path: PATHS.ADMIN.USERS.LIST },
  { label: 'scripts', path: PATHS.ADMIN.SCRIPTS.ADD },
  { label: 'notices', path: PATHS.ADMIN.NOTICES.ADD },
  { label: 'inquiries', path: PATHS.ADMIN.INQUIRIES.LIST },
];

export default function NavAdmin() {
  const { isAdmin } = useAdminStatus();
  const [isNavAdminOpen, setIsNavAdminOpen] = useState(false);

  const toggleNavAdmin = () => setIsNavAdminOpen((prev) => !prev);

  if (!isAdmin) return null;

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-1" onClick={toggleNavAdmin}>
        {isNavAdminOpen ? <ChevronDown size={17} /> : <ChevronRight size={17} />}
        <Text className="cursor-pointer" as="label" typography="subHead-lg">
          admin
        </Text>
      </div>
      {isNavAdminOpen && (
        <div className="ml-6 flex flex-col gap-1">
          {ADMIN_NAV_OPTIONS.map(({ label, path }) => (
            <NavItem key={path} path={path} label={label} />
          ))}
        </div>
      )}
    </div>
  );
}
