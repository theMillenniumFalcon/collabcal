import { create } from "zustand"
import { devtools } from "zustand/middleware"

interface ViewState {
  month: number
  year: number
  setMonth: (month: number) => void
  setYear: (year: number) => void
}

export const useViewStore = create<ViewState>()(
  devtools((set) => ({
    month: 9,
    year: 2024,
    setMonth: (month) => set(() => ({ month })),
    setYear: (year) => set(() => ({ year })),
  }))
)