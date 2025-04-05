"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, Send, X, Plus } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import MoodSelector from "@/components/mood-selector"
import { useToast } from "@/hooks/use-toast"

export default function PostStoryPage() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [mood, setMood] = useState(null)
  const [tags, setTags] = useState([])
  const [newTag, setNewTag] = useState("")
  const [mintAsNFT, setMintAsNFT] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const popularTags = ["anxiety", "depression", "growth", "healing", "mindfulness", "gratitude", "therapy", "self-care"]

  const handleAddTag = (tag) => {
    if (tag && !tags.includes(tag) && tags.length < 5) {
      setTags([...tags, tag])
      setNewTag("")
    } else if (tags.length >= 5) {
      toast({
        title: "Maximum tags reached",
        description: "You can only add up to 5 tags per story.",
        variant: "destructive",
      })
    }
  }

  const handleRemoveTag = (tag) => {
    setTags(tags.filter((t) => t !== tag))
  }

  const handleSubmit = async () => {
    if (!title.trim()) {
      toast({
        title: "Title required",
        description: "Please add a title to your story.",
        variant: "destructive",
      })
      return
    }

    if (content.length < 100) {
      toast({
        title: "Content too short",
        description: "Please share a bit more. Stories should be at least 100 characters.",
        variant: "destructive",
      })
      return
    }

    if (!mood) {
      toast({
        title: "Mood required",
        description: "Please select a mood that represents how you're feeling.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Story shared successfully",
        description: "Thank you for sharing your story with the community.",
      })

      // Reset form
      setTitle("")
      setContent("")
      setMood(null)
      setTags([])
      setMintAsNFT(false)

      // Redirect to home page after successful submission
      window.location.href = "/home"
    }, 1500)
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold mb-2 text-slate-800">Share Your Story</h1>
      <p className="text-slate-600 mb-8">
        Express yourself in a safe, anonymous space. Your story could help others feel less alone.
      </p>

      <Alert className="mb-8 bg-blue-50 border-blue-200">
        <AlertCircle className="h-4 w-4 text-blue-600" />
        <AlertTitle className="text-blue-800">Privacy First</AlertTitle>
        <AlertDescription className="text-blue-700">
          Your story will be shared anonymously. No personal information will be linked to your post.
        </AlertDescription>
      </Alert>

      <div className="space-y-6">
        {/* Title */}
        <div>
          <Label htmlFor="title" className="text-slate-700 font-medium">
            Title
          </Label>
          <Input
            id="title"
            placeholder="Give your story a title..."
            className="mt-2 outline-0 rounded-xl border-lavender-200 text-black bg-white focus-visible:ring-lavender-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Mood Selector */}
        <div>
          <Label className="text-slate-700 font-medium">How are you feeling?</Label>
          <div className="mt-2">
            <MoodSelector selectedMood={mood} onSelectMood={setMood} />
          </div>
        </div>

        {/* Content */}
        <div>
          <Label htmlFor="content" className="text-slate-700 font-medium">
            Your Story
          </Label>
          <Textarea
            id="content"
            placeholder="Share your thoughts, feelings, or experiences..."
            className="mt-2 min-h-[200px] bg-white text-black rounded-xl border-lavender-200 focus-visible:ring-lavender-500"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <p className="text-sm text-slate-500 mt-2">
            {content.length} characters {content.length < 100 && content.length > 0 && "(minimum 100)"}
          </p>
        </div>

        {/* Tags */}
        <div>
          <Label className="text-slate-700 font-medium">Tags (optional)</Label>
          <p className="text-sm text-slate-500 mb-2">Add up to 5 tags to help others find your story</p>

          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag) => (
              <Badge key={tag} className="bg-lavender-100 text-black hover:bg-lavender-200 border border-black rounded-xl px-3 py-1">
                #{tag}
                <button onClick={() => handleRemoveTag(tag)} className="ml-2 text-black border-black">
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>

          <div className="flex gap-2">
            <Input
              placeholder="Add a tag..."
              className="rounded-xl border-lavender-200 bg-white text-black focus-visible:ring-lavender-500"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault()
                  handleAddTag(newTag)
                }
              }}
            />
            <Button variant="outline" className="rounded-xl border-lavender-200" onClick={() => handleAddTag(newTag)}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <div className="mt-4">
            <p className="text-sm text-slate-600 mb-2">Popular tags:</p>
            <div className="flex flex-wrap gap-2">
              {popularTags.map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="rounded-xl px-3 py-1 cursor-pointer border-lavender-200 text-slate-600 hover:bg-lavender-100"
                  onClick={() => handleAddTag(tag)}
                >
                  #{tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        

        {/* Submit Button */}
        <Button
          className="w-full bg-black cursor-pointer hover:bg-lavender-700 text-white py-6 text-lg rounded-2xl mt-4"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full"></div>
              Sharing...
            </>
          ) : (
            <>
              <Send className="mr-2 h-5 w-5" />
              Share Your Story
            </>
          )}
        </Button>
      </div>
    </div>
  )
}

