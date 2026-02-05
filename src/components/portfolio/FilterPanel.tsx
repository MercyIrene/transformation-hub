import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { 
  Filter, 
  X, 
  Search,
  SlidersHorizontal
} from "lucide-react";
import { 
  applicationCategories, 
  applicationStatuses,
  projectCategories,
  projectStatuses
} from "@/data/portfolio";

interface FilterPanelProps {
  type: 'applications' | 'projects';
  onFiltersChange: (filters: any) => void;
  className?: string;
}

export function FilterPanel({ type, onFiltersChange, className }: FilterPanelProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedStatus, setSelectedStatus] = useState("All Statuses");
  const [selectedPriority, setSelectedPriority] = useState("All Priorities");
  const [healthScoreRange, setHealthScoreRange] = useState([0, 100]);
  const [progressRange, setProgressRange] = useState([0, 100]);

  const categories = type === 'applications' ? applicationCategories : projectCategories;
  const statuses = type === 'applications' ? applicationStatuses : projectStatuses;
  const priorities = ['All Priorities', 'Critical', 'High', 'Medium', 'Low'];

  const handleFiltersChange = () => {
    const filters = {
      searchTerm,
      category: selectedCategory === "All Categories" ? null : selectedCategory,
      status: selectedStatus === "All Statuses" ? null : selectedStatus,
      priority: selectedPriority === "All Priorities" ? null : selectedPriority,
      healthScoreRange: type === 'applications' ? healthScoreRange : null,
      progressRange: type === 'projects' ? progressRange : null,
    };
    onFiltersChange(filters);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All Categories");
    setSelectedStatus("All Statuses");
    setSelectedPriority("All Priorities");
    setHealthScoreRange([0, 100]);
    setProgressRange([0, 100]);
    onFiltersChange({
      searchTerm: "",
      category: null,
      status: null,
      priority: null,
      healthScoreRange: null,
      progressRange: null,
    });
  };

  const hasActiveFilters = 
    searchTerm !== "" ||
    selectedCategory !== "All Categories" ||
    selectedStatus !== "All Statuses" ||
    selectedPriority !== "All Priorities" ||
    (type === 'applications' && (healthScoreRange[0] !== 0 || healthScoreRange[1] !== 100)) ||
    (type === 'projects' && (progressRange[0] !== 0 || progressRange[1] !== 100));

  // Apply filters whenever any filter changes
  useEffect(() => {
    handleFiltersChange();
  }, [searchTerm, selectedCategory, selectedStatus, selectedPriority, healthScoreRange, progressRange]);

  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Filter size={18} />
            Filters
            {hasActiveFilters && (
              <Badge variant="secondary" className="ml-2">
                Active
              </Badge>
            )}
          </CardTitle>
          <div className="flex items-center gap-2">
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-muted-foreground hover:text-foreground"
              >
                <X size={16} />
                Clear
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="lg:hidden"
            >
              <SlidersHorizontal size={16} />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className={`space-y-4 ${!isExpanded ? 'hidden lg:block' : ''}`}>
        {/* Search */}
        <div className="space-y-2">
          <Label htmlFor="search" className="text-sm font-medium">
            Search
          </Label>
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              id="search"
              placeholder={`Search ${type}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Category</Label>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Status Filter */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Status</Label>
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {statuses.map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Priority Filter (for projects) */}
        {type === 'projects' && (
          <div className="space-y-2">
            <Label className="text-sm font-medium">Priority</Label>
            <Select value={selectedPriority} onValueChange={setSelectedPriority}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {priorities.map((priority) => (
                  <SelectItem key={priority} value={priority}>
                    {priority}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Health Score Range (for applications) */}
        {type === 'applications' && (
          <div className="space-y-3">
            <Label className="text-sm font-medium">
              Health Score Range: {healthScoreRange[0]}% - {healthScoreRange[1]}%
            </Label>
            <Slider
              value={healthScoreRange}
              onValueChange={setHealthScoreRange}
              max={100}
              min={0}
              step={5}
              className="w-full"
            />
          </div>
        )}

        {/* Progress Range (for projects) */}
        {type === 'projects' && (
          <div className="space-y-3">
            <Label className="text-sm font-medium">
              Progress Range: {progressRange[0]}% - {progressRange[1]}%
            </Label>
            <Slider
              value={progressRange}
              onValueChange={setProgressRange}
              max={100}
              min={0}
              step={5}
              className="w-full"
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}