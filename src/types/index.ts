export interface NavLink {
  label: string
  href: string
}

export interface Metric {
  value: string
  label: string
  suffix?: string
}

export interface ServiceCard {
  title: string
  description: string
  icon: string
}

export interface CaseStudyMetrics {
  label: string
  value: string
}

export interface StatsCounter {
  value: number
  label: string
  suffix?: string
  prefix?: string
}

export interface ContactInfo {
  type: 'email' | 'phone' | 'consultation'
  label: string
  value: string
  href: string
}
