'use client'

import { useState } from 'react'
import { Container } from '@/components/ui/container'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    age: 45,
    procedure: 'Knee Replacement',
    rating: 5,
    text: "Dr. Smith completely transformed my life. After years of chronic knee pain, I can now play with my grandchildren again. The surgery was seamless and the recovery was faster than I ever expected. The entire team was professional and caring throughout the process.",
    location: 'Denver, CO'
  },
  {
    id: 2,
    name: 'Michael Chen',
    age: 28,
    procedure: 'ACL Reconstruction',
    rating: 5,
    text: "As a professional athlete, I was terrified about my ACL tear ending my career. Dr. Smith not only got me back to 100%, but I'm actually performing better than before my injury. His expertise in sports medicine is unmatched.",
    location: 'Boulder, CO'
  },
  {
    id: 3,
    name: 'Patricia Williams',
    age: 62,
    procedure: 'Hip Replacement',
    rating: 5,
    text: "The minimally invasive hip replacement changed everything for me. I was walking the same day as surgery and back to my daily activities within weeks. Dr. Smith's approach made all the difference in my recovery.",
    location: 'Colorado Springs, CO'
  },
  {
    id: 4,
    name: 'David Rodriguez',
    age: 35,
    procedure: 'Shoulder Surgery',
    rating: 5,
    text: "After a serious work injury, I thought I'd never regain full use of my shoulder. Dr. Smith's surgical skill and the rehabilitation program got me back to work and back to the activities I love. Highly recommend!",
    location: 'Aurora, CO'
  }
]

export default function Testimonials() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const current = testimonials[currentTestimonial]

  return (
    <section className="py-24 bg-gray-50">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our Patients Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto text-balance">
            Real stories from real patients who have experienced life-changing results 
            through our comprehensive orthopaedic care.
          </p>
        </div>

        {/* Featured Testimonial */}
        <div className="max-w-4xl mx-auto mb-12">
          <Card className="relative overflow-hidden">
            <div className="absolute top-6 left-6">
              <Quote className="w-8 h-8 text-primary/20" />
            </div>
            
            <CardContent className="p-8 lg:p-12">
              <div className="text-center mb-8">
                <div className="flex justify-center space-x-1 mb-4">
                  {[...Array(current.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                
                <blockquote className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-8 italic">
                  &ldquo;{current.text}&rdquo;
                </blockquote>
                
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-gray-200 rounded-full mb-4 flex items-center justify-center">
                    <span className="text-gray-600 font-semibold text-lg">
                      {current.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-gray-900">
                      {current.name}, {current.age}
                    </div>
                    <div className="text-primary font-medium mb-1">
                      {current.procedure}
                    </div>
                    <div className="text-sm text-gray-500">
                      {current.location}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Navigation */}
              <div className="flex justify-center items-center space-x-4">
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={prevTestimonial}
                  className="rounded-full"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                
                <div className="flex space-x-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentTestimonial(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentTestimonial ? 'bg-primary' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
                
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={nextTestimonial}
                  className="rounded-full"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* All Reviews Summary */}
        <div className="text-center bg-white rounded-2xl p-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="text-3xl font-bold text-gray-900 mb-2">4.9/5</div>
              <div className="flex justify-center space-x-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <div className="text-gray-600">Average Rating</div>
            </div>
            
            <div>
              <div className="text-3xl font-bold text-gray-900 mb-2">500+</div>
              <div className="text-gray-600">Patient Reviews</div>
            </div>
            
            <div>
              <div className="text-3xl font-bold text-gray-900 mb-2">96%</div>
              <div className="text-gray-600">Would Recommend</div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}