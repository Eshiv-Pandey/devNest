import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Filter, 
  Clock, 
  User, 
  BookOpen, 
  Pin,
  Calendar,
  FileText,
  AlertCircle 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import logoImage from '@/assets/logo.png';

interface CourseUpdate {
  id: string;
  title: string;
  content: string;
  professor: string;
  course: string;
  courseCode: string;
  timestamp: string;
  type: 'announcement' | 'assignment' | 'schedule' | 'exam' | 'urgent';
  isPinned: boolean;
  attachments?: string[];
}

const mockUpdates: CourseUpdate[] = [
  {
    id: '1',
    title: 'Lab Session Rescheduled - Important',
    content: 'The Physics Lab session scheduled for Thursday has been moved to Friday 2:00 PM due to equipment maintenance. Please bring your lab manuals.',
    professor: 'Dr. Sarah Smith',
    course: 'Physics',
    courseCode: 'PHY101',
    timestamp: '2 hours ago',
    type: 'urgent',
    isPinned: true
  },
  {
    id: '2',
    title: 'Assignment Deadline Extended',
    content: 'The Database Design project deadline has been extended to next Friday (Dec 22nd) at 11:59 PM. Make sure to submit your ER diagrams and normalized tables.',
    professor: 'Prof. Mike Johnson',
    course: 'Database Systems',
    courseCode: 'CS201',
    timestamp: '4 hours ago',
    type: 'assignment',
    isPinned: true
  },
  {
    id: '3',
    title: 'Guest Lecture: AI in Healthcare',
    content: 'We have a special guest lecturer from Google AI team joining us next Tuesday to discuss applications of machine learning in healthcare.',
    professor: 'Dr. Emily Chen',
    course: 'Machine Learning',
    courseCode: 'CS301',
    timestamp: '1 day ago',
    type: 'announcement',
    isPinned: false
  },
  {
    id: '4',
    title: 'Midterm Exam Schedule',
    content: 'Midterm exams will be held on December 18th, 10:00 AM - 12:00 PM in Room 205. Topics covered: Chapters 1-6. Calculators allowed.',
    professor: 'Dr. Robert Lee',
    course: 'Calculus',
    courseCode: 'MATH101',
    timestamp: '2 days ago',
    type: 'exam',
    isPinned: false
  },
  {
    id: '5',
    title: 'New Reading Materials Available',
    content: 'I\'ve uploaded additional reading materials for next week\'s lectures. Please check the course portal and complete the readings before class.',
    professor: 'Prof. Lisa Williams',
    course: 'Literature',
    courseCode: 'ENG201',
    timestamp: '3 days ago',
    type: 'announcement',
    isPinned: false
  }
];

const CourseUpdates = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  const courses = Array.from(new Set(mockUpdates.map(update => update.course)));
  const types = ['announcement', 'assignment', 'schedule', 'exam', 'urgent'];

  const filteredUpdates = mockUpdates.filter(update => {
    const matchesSearch = update.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         update.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         update.professor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCourse = selectedCourse === 'all' || update.course === selectedCourse;
    const matchesType = selectedType === 'all' || update.type === selectedType;
    
    return matchesSearch && matchesCourse && matchesType;
  });

  const pinnedUpdates = filteredUpdates.filter(update => update.isPinned);
  const regularUpdates = filteredUpdates.filter(update => !update.isPinned);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'assignment': return FileText;
      case 'exam': return AlertCircle;
      case 'schedule': return Calendar;
      case 'urgent': return AlertCircle;
      default: return BookOpen;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'assignment': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'exam': return 'bg-red-500/10 text-red-400 border-red-500/20';
      case 'schedule': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      case 'urgent': return 'bg-orange-500/10 text-orange-400 border-orange-500/20';
      default: return 'bg-primary/10 text-primary border-primary/20';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-lg sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full overflow-hidden">
                <img 
                  src={logoImage} 
                  alt="devNest Logo" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h1 className="text-lg font-bold">
                <span className="text-logo-gray">dev</span>
                <span className="text-primary">Ne</span>
                <span className="text-logo-orange">st</span>
              </h1>
            </Link>

            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" asChild>
                <Link to="/dashboard">Dashboard</Link>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link to="/auth">Sign In</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Title Section */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold mb-4">Course Updates</h1>
          <p className="text-muted-foreground text-lg">
            Stay updated with the latest announcements, assignments, and schedules from your professors
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4 animate-fade-in">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search updates, professors, or courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-2">
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="px-3 py-2 bg-card border border-border rounded-md text-sm"
              >
                <option value="all">All Courses</option>
                {courses.map(course => (
                  <option key={course} value={course}>{course}</option>
                ))}
              </select>

              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-3 py-2 bg-card border border-border rounded-md text-sm"
              >
                <option value="all">All Types</option>
                {types.map(type => (
                  <option key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Pinned Updates */}
        {pinnedUpdates.length > 0 && (
          <div className="mb-8 animate-fade-in">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Pin className="w-5 h-5 mr-2 text-primary" />
              Pinned Updates
            </h2>
            <div className="space-y-4">
              {pinnedUpdates.map((update, index) => (
                <Card 
                  key={update.id} 
                  className="border-l-4 border-l-primary shadow-card hover:shadow-hover transition-smooth animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline" className={getTypeColor(update.type)}>
                            {React.createElement(getTypeIcon(update.type), { className: "w-3 h-3 mr-1" })}
                            {update.type.charAt(0).toUpperCase() + update.type.slice(1)}
                          </Badge>
                          <Badge variant="secondary">
                            {update.courseCode}
                          </Badge>
                        </div>
                        <CardTitle className="text-lg">{update.title}</CardTitle>
                      </div>
                      <Pin className="w-4 h-4 text-primary" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{update.content}</p>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <User className="w-4 h-4 mr-1" />
                          {update.professor}
                        </div>
                        <div className="flex items-center">
                          <BookOpen className="w-4 h-4 mr-1" />
                          {update.course}
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {update.timestamp}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Regular Updates */}
        <div className="animate-fade-in">
          <h2 className="text-xl font-semibold mb-4">Recent Updates</h2>
          <div className="space-y-4">
            {regularUpdates.map((update, index) => (
              <Card 
                key={update.id} 
                className="shadow-card hover:shadow-hover transition-smooth animate-scale-in"
                style={{ animationDelay: `${(pinnedUpdates.length + index) * 0.1}s` }}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className={getTypeColor(update.type)}>
                          {React.createElement(getTypeIcon(update.type), { className: "w-3 h-3 mr-1" })}
                          {update.type.charAt(0).toUpperCase() + update.type.slice(1)}
                        </Badge>
                        <Badge variant="secondary">
                          {update.courseCode}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg">{update.title}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{update.content}</p>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-1" />
                        {update.professor}
                      </div>
                      <div className="flex items-center">
                        <BookOpen className="w-4 h-4 mr-1" />
                        {update.course}
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {update.timestamp}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* No Results */}
        {filteredUpdates.length === 0 && (
          <div className="text-center py-12 animate-fade-in">
            <BookOpen className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">No updates found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search terms or filters
            </p>
          </div>
        )}

        {/* Note about Supabase */}
        <div className="mt-12 p-4 bg-card/50 rounded-lg border border-border animate-fade-in">
          <p className="text-xs text-muted-foreground text-center">
            <strong>Note:</strong> This shows demo course updates. Connect to Supabase to enable real-time 
            updates from professors, course management, and personalized content based on enrolled courses.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CourseUpdates;