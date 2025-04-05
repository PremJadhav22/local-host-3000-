"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter } from "lucide-react"
import StoryCard from "@/components/story-card"
import { Badge } from "@/components/ui/badge"

// Sample data for stories
const stories = [
  {
    id: "1",
    title: "Finding Light in Darkness",
    preview: "I've been struggling with anxiety for years, but recently I found a technique that's been helping me...",
    mood: "😞",
    tags: ["anxiety", "coping", "growth"],
    timestamp: "2 hours ago",
    supportCount: 12,
    relateCount: 8,
  },
  {
    id: "2",
    title: "Small Victories Matter",
    preview: "Today I managed to go grocery shopping despite my social anxiety. It might seem small to others...",
    mood: "🙂",
    tags: ["anxiety", "victory", "progress"],
    timestamp: "5 hours ago",
    supportCount: 24,
    relateCount: 15,
  },
  {
    id: "3",
    title: "The Unexpected Journey of Grief",
    preview:
      "After losing my father last year, I've been on a rollercoaster of emotions. Some days are better than others...",
    mood: "😐",
    tags: ["grief", "loss", "healing"],
    timestamp: "1 day ago",
    supportCount: 32,
    relateCount: 18,
  },
  {
    id: "4",
    title: "Breaking the Cycle of Negative Thoughts",
    preview: "I've been practicing mindfulness to break my pattern of negative thinking. It's been challenging but...",
    mood: "🙂",
    tags: ["mindfulness", "thoughts", "practice"],
    timestamp: "2 days ago",
    supportCount: 19,
    relateCount: 11,
  },
  {
    id: "5",
    title: "When Medication Isn't Enough",
    preview:
      "I've been on antidepressants for a year now, and while they help, I'm learning that healing requires more...",
    mood: "😐",
    tags: ["medication", "depression", "journey"],
    timestamp: "3 days ago",
    supportCount: 27,
    relateCount: 22,
  },
  {
    id: "6",
    title: "Learning to Set Boundaries",
    preview: "Setting boundaries has been the hardest but most rewarding part of my mental health journey...",
    mood: "🙂",
    tags: ["boundaries", "growth", "relationships"],
    timestamp: "4 days ago",
    supportCount: 31,
    relateCount: 16,
  },
]

// All unique tags from stories
const allTags = Array.from(new Set(stories.flatMap((story) => story.tags)))

export default function StoryFeedPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTags, setSelectedTags] = useState([])
  const [selectedMood, setSelectedMood] = useState(null)

  // Filter stories based on search query, selected tags, and mood
  const filteredStories = stories.filter((story) => {
    const matchesSearch =
      story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      story.preview.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesTags = selectedTags.length === 0 || selectedTags.some((tag) => story.tags.includes(tag))

    const matchesMood = !selectedMood || story.mood === selectedMood

    return matchesSearch && matchesTags && matchesMood
  })

  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag))
    } else {
      setSelectedTags([...selectedTags, tag])
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-white">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-6 text-slate-800">Story Feed</h1>
        <p className="text-slate-600 mb-8">
          Explore anonymous stories from the community. Read, support, and relate to others on their mental health
          journey.
        </p>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <Input
              placeholder="Search stories..."
              className="pl-10 rounded-xl bg-white border-lavender-200 focus-visible:ring-lavender-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              className="rounded-xl bg-white hover:bg-slate-200 cursor-pointer border-lavender-200 text-slate-600"
              onClick={() => {
                setSelectedTags([])
                setSelectedMood(null)
                setSearchQuery("")
              }}
            >
              Reset
            </Button>

            <Button variant="outline" className="rounded-xl bg-white border-lavender-200 text-slate-600">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>

        {/* Mood Filter */}
        
        {/* Tags Filter */}
        <div className="mb-8">
          <h3 className="text-sm font-medium text-slate-500 mb-3">Popular Tags</h3>
          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => (
              <Badge
                key={tag}
                variant={selectedTags.includes(tag) ? "default" : "outline"}
                className={`rounded-xl px-3 py-1 text-sm cursor-pointer ${
                  selectedTags.includes(tag)
                    ? "text-black border-black"
                    : "border-lavender-200 text-slate-600 hover:bg-lavender-100"
                }`}
                onClick={() => toggleTag(tag)}
              >
                #{tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Story Feed Tabs */}
      <Tabs defaultValue="recent" className="mb-8">
        {/* <TabsList className="bg-lavender-50 p-1 rounded-xl">
          <TabsTrigger
            value="recent"
            className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-lavender-700"
          >
            Recent
          </TabsTrigger>
          <TabsTrigger
            value="trending"
            className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-lavender-700"
          >
            Trending
          </TabsTrigger>
          <TabsTrigger
            value="supported"
            className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-lavender-700"
          >
            Most Supported
          </TabsTrigger>
        </TabsList> */}

        <TabsContent value="recent" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStories.map((story) => (
              <StoryCard key={story.id} story={story} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="trending" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStories
              .sort((a, b) => b.supportCount + b.relateCount - (a.supportCount + a.relateCount))
              .map((story) => (
                <StoryCard key={story.id} story={story} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="supported" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStories
              .sort((a, b) => b.supportCount - a.supportCount)
              .map((story) => (
                <StoryCard key={story.id} story={story} />
              ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* No Results */}
      {filteredStories.length === 0 && (
        <div className="text-center py-12 bg-lavender-50 rounded-2xl">
          <h3 className="text-xl font-medium text-slate-700 mb-2">No stories found</h3>
          <p className="text-slate-600">Try adjusting your search or filters to find more stories.</p>
        </div>
      )}


    
    </div>
  )
}

