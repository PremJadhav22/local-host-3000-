import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, MessageCircle, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function StoryCard({ story }) {
  return (
    <Card className="border-lavender-100 rounded-2xl overflow-hidden hover:shadow-md transition-shadow h-full flex flex-col">
      <CardContent className="pt-6 flex-1">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <div className="bg-lavender-50 w-8 h-8 rounded-full flex items-center justify-center mr-2">
              <span className="text-lg">{story.mood}</span>
            </div>
            <span className="text-xs text-slate-500">{story.timestamp}</span>
          </div>
          <div>
            {story.tags.slice(0, 1).map((tag) => (
              <Badge key={tag} className="bg-lavender-100 text-lavender-800 hover:bg-lavender-200 rounded-xl">
                #{tag}
              </Badge>
            ))}
          </div>
        </div>

        <h3 className="font-bold text-lg mb-2 text-slate-800">{story.title}</h3>
        <p className="text-slate-600 mb-4 line-clamp-3">{story.preview}</p>

        {story.tags.length > 1 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {story.tags.slice(1, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs rounded-xl border-lavender-200 text-slate-600">
                #{tag}
              </Badge>
            ))}
            {story.tags.length > 3 && (
              <Badge variant="outline" className="text-xs rounded-xl border-lavender-200 text-slate-600">
                +{story.tags.length - 3} more
              </Badge>
            )}
          </div>
        )}
      </CardContent>

      <CardFooter className="border-t border-lavender-100 pt-4 flex justify-between">
        <div className="flex items-center space-x-3 text-sm text-slate-500">
          <div className="flex items-center">
            <Heart className="h-4 w-4 mr-1 text-lavender-500" />
            <span>{story.supportCount}</span>
          </div>
          <div className="flex items-center">
            <MessageCircle className="h-4 w-4 mr-1 text-blue-500" />
            <span>{story.relateCount}</span>
          </div>
        </div>

        <Link href={`/story/${story.id}`}>
          <Button
            variant="outline"
            size="sm"
            className="rounded-xl border-lavender-200 text-lavender-700 cursor-pointer hover:bg-lavender-100"
          >
            Read More
            <ArrowRight className="ml-1 h-3 w-3" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

