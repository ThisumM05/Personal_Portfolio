import onlineEventTicketingImage from '../assets/online-event-ticketing-system.png'
import eShiftManagementImage from '../assets/e-shift-management-system.png'
import medicareManagementImage from '../assets/medicare-management-system.png'
import foodhubManagementImage from '../assets/foodhub-management-system.png'

export const projects = [
  {
    slug: 'online-event-ticketing-system',
    title: 'Online Event Ticketing System',
    summary: 'End-to-end platform to manage events, tickets, and payments with reliable seat inventory.',
    tech: ['C#', '.NET', 'React', 'SQL Server'],
    imageUrl: onlineEventTicketingImage,
    githubUrl: '', // TODO: replace with actual GitHub URL
    liveUrl: '#', // TODO: replace with Live Demo or Case Study URL
  },
  {
    slug: 'e-shift-management-system',
    title: 'E-Shift Management System',
    summary: 'Scheduling and shift-handling system to keep teams aligned and operations predictable.',
    tech: ['Java', 'Spring', 'MySQL'],
    imageUrl: eShiftManagementImage,
    githubUrl: 'https://github.com/ThisumM05/Eshift_Management_System.git',
    liveUrl: '#',
  },
  {
    slug: 'medicare-management-system',
    title: 'MediCare Management System',
    summary: 'Clinical workflow and patient record management built for consistency and traceability.',
    tech: ['C#', '.NET', 'SQL Server'],
    imageUrl: medicareManagementImage,
    githubUrl: 'https://github.com/ThisumM05/MediCare_Pvt_Ltd.git',
    liveUrl: '#',
  },
  {
    slug: 'foodhub-management-system',
    title: 'FoodHub Management System',
    summary: 'Order and inventory management for food services, connecting menus, orders, and kitchens.',
    tech: ['React', 'Node.js', 'MySQL'],
    imageUrl: foodhubManagementImage,
    githubUrl: '',
    liveUrl: '#',
  },
]
