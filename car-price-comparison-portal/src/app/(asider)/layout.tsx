'use client'
import React, { useState } from 'react'
import Header from '@/components/Header'
import Aside from '@/components/Aside'
export default function AsideLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex flex-col h-full">
      <Header />
      <div className="flex p-20 gap-20 bg-slate-100">
        <Aside />
        <div className="flex-auto overflow-auto bg-white p-10">{children}</div>
      </div>
    </div>
  )
}
