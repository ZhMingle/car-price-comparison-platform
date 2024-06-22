import { Button } from 'antd'
import { useRouter } from 'next/navigation'
export default function Header() {
  const router = useRouter()
  return (
    <div className="h-50 px-20 flex justify-between items-center">
      <span>Used car management system</span>
      <Button
        type="text"
        onClick={() => {
          router.push('/login')
        }}>
        Quit
      </Button>
    </div>
  )
}
