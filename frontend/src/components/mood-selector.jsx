"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"


export default function MoodSelector({ selectedMood, onSelectMood }) {
  const moods = [
    { emoji: "😞", label: "Struggling" },
    { emoji: "😐", label: "Neutral" },
    { emoji: "🙂", label: "Hopeful" },
  ]

  return (
    <div className="flex flex-wrap bg-white gap-4">
      {moods.map((mood) => (
        <Button
          key={mood.emoji}
          type="button"
          variant="outline"
          className={cn(
            "flex items-center justify-center py-6 px-8 bg-white rounded-2xl border-2 transition-all",
            selectedMood === mood.emoji
              ? "border-lavender-500 bg-lavender-50 text-lavender-700"
              : "border-lavender-200 hover:border-lavender-300 hover:bg-lavender-50",
          )}
          onClick={() => onSelectMood(mood.emoji)}
        >
          <span className="text-sm mb-2">{mood.emoji}</span>
          <span className="text-sm font-medium text-black">{mood.label}</span>
        </Button>
      ))}
    </div>
  )
}

