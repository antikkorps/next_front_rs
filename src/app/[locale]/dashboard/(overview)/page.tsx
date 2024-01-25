import Card from "@/components/Card"
import Stories from "@/components/Stories"

export default function DashboardPage() {
  return (
    <>
      <div className="w-full sm:w-1/2 flex justify-center mx-auto mb-10 ">
        <Stories />
      </div>
      <Card />
    </>
  )
}
