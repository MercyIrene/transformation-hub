# Stage 3 TO Dashboard Polish & Fulfillment Flow - Design

## Architecture Overview

### Component Structure
```
Stage3TODashboard (Main Container)
├── Left Sidebar (Navigation)
├── Main Content Area
│   ├── Dashboard View (KPIs, charts, activity feed)
│   ├── Requests List View (Table with filters)
│   └── Request Detail Drawer (Slide-out panel)
│       ├── Request Header (Title, status, priority)
│       ├── Request Details (Type-specific fields)
│       ├── Workflow Actions (Contextual buttons)
│       ├── Activity Timeline (Updates log)
│       └── Assignment Section (Team member selector)
```

## State Management Design

### Active View State
```typescript
type ViewType = 
  | "dashboard"
  | "all-requests"
  | "team"
  | "analytics";

const [activeView, setActiveView] = useState<ViewType>("all-requests");
```

### Filter State
```typescript
interface FilterState {
  status: string;
  priority: string;
  type: string;
  assignee: string;
  searchTerm: string;
}

const [filters, setFilters] = useState<FilterState>({
  status: "all",
  priority: "all",
  type: "all",
  assignee: "all",
  searchTerm: ""
});
```

### Request Detail State
```typescript
const [selectedRequest, setSelectedRequest] = useState<ServiceRequest | null>(null);
const [isDetailDrawerOpen, setIsDetailDrawerOpen] = useState(false);
```

## Navigation Highlighting Logic

```typescript
const getNavItemClass = (view: ViewType) => {
  return activeView === view
    ? "bg-orange-50 text-orange-700 font-medium"
    : "text-gray-700 hover:bg-gray-50";
};

const handleNavClick = (view: ViewType, statusFilter?: string) => {
  setActiveView(view);
  if (statusFilter) {
    setFilters(prev => ({ ...prev, status: statusFilter }));
  } else if (view !== "all-requests") {
    // Reset filters when switching to non-request views
    setFilters({
      status: "all",
      priority: "all",
      type: "all",
      assignee: "all",
      searchTerm: ""
    });
  }
};
```

## Request Detail Drawer Component

### Props Interface
```typescript
interface RequestDetailDrawerProps {
  request: ServiceRequest | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (updatedRequest: ServiceRequest) => void;
}
```

### Layout
- Slide-out from right side (w-1/2 or w-2/3)
- Overlay backdrop with click-to-close
- Scrollable content area
- Fixed header with close button
- Fixed footer with action buttons

## Workflow Actions Component

### Action Buttons by Request Type

#### DTMP Templates
```typescript
const templateActions = [
  { label: "Start AI DocWriter", status: "assigned", nextStatus: "in-progress" },
  { label: "Review Template", status: "in-progress", nextStatus: "pending-review" },
  { label: "Request Revisions", status: "pending-review", nextStatus: "in-progress" },
  { label: "Deliver Template", status: "pending-review", nextStatus: "completed" }
];
```

#### Solution Specs
```typescript
const specActions = [
  { label: "Start AI DocWriter", status: "assigned", nextStatus: "in-progress" },
  { label: "Review Specification", status: "in-progress", nextStatus: "pending-review" },
  { label: "Collaborate with Requester", status: "pending-review", nextStatus: "in-progress" },
  { label: "Deliver Specification", status: "pending-review", nextStatus: "completed" }
];
```

#### Solution Build
```typescript
const buildActions = [
  { label: "Provision Build", status: "assigned", nextStatus: "in-progress" },
  { label: "Configure Access", status: "in-progress", nextStatus: "in-progress" },
  { label: "Request Security Approval", status: "in-progress", nextStatus: "pending-review" },
  { label: "Deliver Build Access", status: "pending-review", nextStatus: "completed" }
];
```

#### Support Services
```typescript
const supportActions = [
  { label: "Begin Support Session", status: "assigned", nextStatus: "in-progress" },
  { label: "Waiting for User", status: "in-progress", nextStatus: "pending-user" },
  { label: "Resume Support", status: "pending-user", nextStatus: "in-progress" },
  { label: "Mark Resolved", status: "in-progress", nextStatus: "completed" }
];
```

## Activity Timeline Component

### Activity Entry Structure
```typescript
interface ActivityEntry {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  details?: string;
  type: "status-change" | "assignment" | "note" | "action";
}
```

### Visual Design
- Vertical timeline with dots and connecting lines
- Color-coded by activity type
- Timestamp on left, content on right
- Most recent at top

## Dashboard View Design

### Layout Sections

#### 1. KPI Metrics (Top Row)
- Total Requests
- Active Requests
- SLA Compliance
- Avg Resolution Time
- Customer Satisfaction

#### 2. Request Breakdown (Second Row)
- Requests by Type (Pie chart or bar chart)
- Requests by Status (Bar chart)

#### 3. Team Workload (Third Row)
- Team member cards showing current assignments
- Capacity utilization bars

#### 4. Recent Activity & At-Risk Requests (Bottom Row)
- Activity feed (left column)
- SLA at-risk requests (right column)

## Type-Specific Request Fields

### DTMP Templates
```typescript
interface TemplateRequestFields {
  templateType: string;
  requirements: string;
  industryStandards: string[];
  customizations: string;
  outputFormat: string;
}
```

### Solution Specs
```typescript
interface SpecRequestFields {
  solutionType: string;
  architectureRequirements: string;
  technologyStack: string[];
  complianceRequirements: string[];
  integrationPoints: string[];
  performanceRequirements: string;
}
```

### Solution Build
```typescript
interface BuildRequestFields {
  buildType: string;
  environment: "dev" | "staging" | "prod";
  accessLevel: string;
  securityClearance: "pending" | "approved" | "denied";
  integrationRequirements: string[];
  supportLevel: string;
}
```

### Support Services
```typescript
interface SupportRequestFields {
  supportType: "technical-support" | "expert-consultation" | "optimization";
  severity: "critical" | "high" | "medium" | "low";
  issueDescription: string;
  environmentInfo: string;
  relatedTickets: string[];
  communicationLog: CommunicationEntry[];
  resolutionNotes: string;
}
```

## Status Transition Rules

### Valid Transitions by Request Type

#### All Types
```typescript
const statusTransitions = {
  "new": ["assigned", "cancelled"],
  "assigned": ["in-progress", "on-hold", "cancelled"],
  "in-progress": ["pending-review", "pending-user", "on-hold", "cancelled"],
  "pending-review": ["in-progress", "completed", "on-hold"],
  "pending-user": ["in-progress", "on-hold", "cancelled"],
  "on-hold": ["assigned", "in-progress", "cancelled"],
  "completed": [], // Terminal state
  "cancelled": []  // Terminal state
};
```

### Type-Specific Variations
- Support Services can use "pending-user" status
- Solution Build requires "pending-review" for security approval
- Templates and Specs use "pending-review" for requester review

## UI Polish Checklist

### Navigation
- [x] Fix active state highlighting
- [x] Proper filter state management
- [x] Clear visual feedback for active view

### Interactions
- [ ] Smooth drawer open/close animations
- [ ] Loading states for async operations
- [ ] Success/error toast notifications
- [ ] Confirmation dialogs for destructive actions

### Responsive Design
- [ ] Mobile-friendly drawer (full width on mobile)
- [ ] Collapsible sidebar on small screens
- [ ] Responsive table (card view on mobile)

### Accessibility
- [ ] Keyboard navigation support
- [ ] ARIA labels for interactive elements
- [ ] Focus management in drawer
- [ ] Screen reader friendly

## Implementation Plan

### Phase 1: Fix Navigation & UI Bugs
1. Fix sidebar navigation highlighting
2. Implement proper state management
3. Fix filter state issues
4. Test all interactions

### Phase 2: Request Detail Drawer
1. Create RequestDetailDrawer component
2. Implement drawer open/close logic
3. Display request details
4. Add close functionality

### Phase 3: Workflow Actions
1. Create WorkflowActions component
2. Implement action buttons by type
3. Add status update logic
4. Test status transitions

### Phase 4: Activity Timeline
1. Create ActivityTimeline component
2. Display activity entries
3. Add new activity on updates
4. Style timeline

### Phase 5: Assignment & Notes
1. Create AssignmentSelector component
2. Implement team member selection
3. Add notes functionality
4. Update activity log

### Phase 6: Dashboard View
1. Create dashboard layout
2. Add KPI metrics
3. Add charts for breakdowns
4. Add activity feed
5. Add at-risk requests section

### Phase 7: Polish & Testing
1. Add animations and transitions
2. Implement loading states
3. Add error handling
4. Test all workflows
5. Fix any remaining bugs

## Data Structure Updates

### Enhanced ServiceRequest
```typescript
interface ServiceRequest {
  // Existing fields...
  
  // New fields for workflows
  typeSpecificFields: TemplateRequestFields | SpecRequestFields | BuildRequestFields | SupportRequestFields;
  activityLog: ActivityEntry[];
  workflowStage: string;
  lastActivity: string;
  communicationLog?: CommunicationEntry[];
}
```

### Activity Entry
```typescript
interface ActivityEntry {
  id: string;
  timestamp: string;
  user: string;
  userRole: string;
  action: string;
  details?: string;
  type: "status-change" | "assignment" | "note" | "action" | "communication";
  metadata?: Record<string, any>;
}
```

## Testing Strategy

### Unit Tests
- Navigation state management
- Filter logic
- Status transition validation
- Activity log updates

### Integration Tests
- Complete workflow for each request type
- Drawer open/close with data
- Assignment updates
- Status updates with activity log

### E2E Tests
- Navigate through all views
- Open request detail
- Perform workflow actions
- Complete full request lifecycle

## Performance Considerations

- Lazy load request details when drawer opens
- Virtualize long request lists
- Debounce search input
- Memoize filtered results
- Optimize re-renders with React.memo

## Future Enhancements

1. Real-time updates with WebSocket
2. Email notifications
3. File attachments
4. Advanced analytics dashboard
5. Automated routing rules
6. Custom fields per request type
7. Reporting and exports
8. Integration with external systems
