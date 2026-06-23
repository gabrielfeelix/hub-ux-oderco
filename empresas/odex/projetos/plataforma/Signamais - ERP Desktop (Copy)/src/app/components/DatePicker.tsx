import * as React from "react"
import { format, isValid, parse } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Calendar as CalendarIcon } from "lucide-react"
import * as Popover from "@radix-ui/react-popover"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Calendar } from "./Calendar"

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

interface DatePickerProps {
  date: Date | undefined
  setDate: (date: Date | undefined) => void
  placeholder?: string
  className?: string
}

export function DatePicker({ date, setDate, placeholder = "DD/MM/AAAA", className }: DatePickerProps) {
  const [open, setOpen] = React.useState(false)
  const [inputValue, setInputValue] = React.useState("")

  // Sync input value when date prop changes
  React.useEffect(() => {
    if (date) {
      setInputValue(format(date, "dd/MM/yyyy"))
    } else {
      setInputValue("")
    }
  }, [date])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value
    
    // Simple masking logic for DD/MM/YYYY
    // Allow only numbers and slashes
    value = value.replace(/[^\d\/]/g, "")
    
    // Auto-insert slashes
    if (value.length === 2 && inputValue.length === 1) value += "/"
    if (value.length === 5 && inputValue.length === 4) value += "/"
    if (value.length > 10) value = value.slice(0, 10)

    setInputValue(value)

    if (value.length === 10) {
      const parsedDate = parse(value, "dd/MM/yyyy", new Date())
      if (isValid(parsedDate)) {
        setDate(parsedDate)
      } else {
        setDate(undefined)
      }
    } else {
      if (value === "") {
        setDate(undefined)
      }
      // If incomplete, we don't update the date yet, or we set it to undefined?
      // Usually better to wait until valid
    }
  }

  const handleSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate)
    setOpen(false)
    if (selectedDate) {
      setInputValue(format(selectedDate, "dd/MM/yyyy"))
    } else {
      setInputValue("")
    }
  }

  const handleClear = () => {
    setDate(undefined)
    setInputValue("")
    setOpen(false)
  }

  const handleToday = () => {
    const today = new Date()
    setDate(today)
    setInputValue(format(today, "dd/MM/yyyy"))
    setOpen(false)
  }

  return (
    <div className={cn("relative w-full", className)}>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder={placeholder}
        maxLength={10}
        className={cn(
          "w-full p-3 pr-12 rounded-xl border border-gray-200 bg-gray-50 text-left font-normal transition-all outline-none focus:ring-2 focus:ring-[#8925e2]",
          !inputValue && "text-gray-500"
        )}
      />
      <Popover.Root open={open} onOpenChange={setOpen}>
        <Popover.Trigger asChild>
          <button
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#8925e2] transition-colors p-1 rounded-md hover:bg-gray-100"
            type="button"
          >
            <CalendarIcon className="h-5 w-5" />
          </button>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content 
            className="z-[110] w-auto p-0 bg-white rounded-xl shadow-xl border border-gray-100 animate-in fade-in zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2" 
            align="end"
            sideOffset={8}
          >
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleSelect}
              initialFocus
              defaultMonth={date}
            />
            <div className="flex items-center justify-between p-3 border-t border-gray-100">
               <button 
                  onClick={handleClear}
                  className="text-sm font-medium text-[#0091ff] hover:underline px-2 py-1 rounded"
               >
                  Limpar
               </button>
               <button 
                  onClick={handleToday}
                  className="text-sm font-medium text-[#0091ff] hover:underline px-2 py-1 rounded"
               >
                  Hoje
               </button>
            </div>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </div>
  )
}
