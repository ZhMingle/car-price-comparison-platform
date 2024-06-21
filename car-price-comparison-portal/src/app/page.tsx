'use client'
import Link from 'next/link'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
export default function Home() {
  return (
    <main>
      <header className="flex p-20">
        <Stack spacing={2} direction="row">
          <Button variant="contained">login</Button>
          <Button variant="outlined">register</Button>
          <Button>
            <Link href="/user-manage">user-manage</Link>
          </Button>
          <Button>
            <Link href="/car-manage">car-manage</Link>
          </Button>
        </Stack>
      </header>
      <div>car-list</div>
    </main>
  )
}
