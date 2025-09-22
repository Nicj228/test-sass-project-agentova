'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { getModule } from '@/modules/core/ModuleRegistry';

interface PageParams { name: string; module: string }
interface PageProps { params: Promise<PageParams> }

export default function EmployeeModulePage({ params }: PageProps) {
  const router = useRouter();
  const { name, module } = React.use(params);
  const ActiveModule = getModule(module);

  const handleModuleChange = (nextModuleId: string) => {
    router.push(`/dashboard/employees/${name}/${nextModuleId}`);
  };

  if (!ActiveModule) {
    router.push(`/dashboard/employees/${name}/chat`);
    return null;
  }

  return <ActiveModule employee={name} onModuleChange={handleModuleChange} />;
}


