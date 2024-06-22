'use client'

import { Amplify } from 'aws-amplify'
import amplifyconfig from '../../amplify-build-config.json'

Amplify.configure(amplifyconfig as any)
export default function Home() {
  return (
    <main>
      <header className="flex p-20"></header>
      <div>car-list</div>
    </main>
  )
}
