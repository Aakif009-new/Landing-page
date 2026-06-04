import { connectDB } from '@/lib/mongodb'
import { requireEnv } from '@/lib/env'
import { Admin } from '@/models/Admin'
import { Hero } from '@/models/Hero'
import { About } from '@/models/About'
import { FeaturedProduct } from '@/models/FeaturedProduct'
import { ProcessStep } from '@/models/ProcessStep'
import { Product } from '@/models/Product'
import { CTA } from '@/models/CTA'
import { Contact } from '@/models/Contact'
import { Footer } from '@/models/Footer'
import { hashPassword } from '@/lib/auth'

export async function seedDatabase() {
  await connectDB()

  const adminCount = await Admin.countDocuments()
  if (adminCount === 0) {
    const passwordHash = await hashPassword(requireEnv('ADMIN_PASSWORD'))
    await Admin.create({
      email: requireEnv('ADMIN_EMAIL'),
      passwordHash,
      role: 'superadmin',
    })
    console.log('Admin seeded successfully')
  }

  const heroCount = await Hero.countDocuments()
  if (heroCount === 0) {
    await Hero.create({
      title: 'Power your future with clean solar energy',
      subtitle: '',
      backgroundImage: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1800&q=80',
      primaryButtonText: 'Explore More',
      primaryButtonLink: '#services',
      secondaryButtonText: 'Watch Video',
      secondaryButtonLink: '#case-study',
      floatingCardTitle: 'Power station',
      floatingCardDescription: 'Power station from Xi area to Vana hills',
      floatingCardImage: 'https://images.unsplash.com/photo-1548337138-e87d889cc369?auto=format&fit=crop&w=400&q=80',
    })
  }

  const aboutCount = await About.countDocuments()
  if (aboutCount === 0) {
    await About.create({
      sectionLabel: '[ Feature ]',
      heading: 'We are a dedicated team of energy experts passionate about the accelerating solar',
      description: 'We craft solar systems with high-performance materials, precise engineering, and timeless design standards.',
      teamCount: 52,
      teamImages: [
        'https://images.unsplash.com/photo-1546961329-78bef0414d7c?auto=format&fit=crop&w=220&q=80',
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=220&q=80',
        'https://images.unsplash.com/photo-1542178432-52211bc52073?auto=format&fit=crop&w=220&q=80',
      ],
      aboutImage: 'https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?auto=format&fit=crop&w=1300&q=80',
    })
  }

  const featuredCount = await FeaturedProduct.countDocuments()
  if (featuredCount === 0) {
    await FeaturedProduct.insertMany([
      {
        name: 'Suncryst EdgeTech 500W Module Dual-Layer PERC',
        description: 'High-efficiency panel architecture designed for dense rooftops and long-term durability.',
        specifications: ['Special Edition Product', '500W Output / 22% Efficiency', 'Mono N-type Cell + Rear Contact'],
        image: 'https://images.unsplash.com/photo-1592833159155-c62df1b65634?auto=format&fit=crop&w=1200&q=80',
        displayOrder: 0,
        active: true,
      },
      {
        name: 'SolarNova GridCell 550W',
        description: 'Engineered for utility-scale fields where performance stability and heat tolerance are critical.',
        specifications: ['550W Utility-Class Panel', 'Dual Glass + 30 Year Warranty', 'Optimized for Harsh Climates'],
        image: 'https://images.unsplash.com/photo-1624397640148-949b1732bb0a?auto=format&fit=crop&w=1200&q=80',
        displayOrder: 1,
        active: true,
      },
      {
        name: 'HelioMax TriPhase 533W',
        description: 'Commercial-grade module tuned for factories and campuses needing reliable daytime output.',
        specifications: ['533W Commercial Panel', 'Smart Junction Monitoring', 'High Precision Engineering'],
        image: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=1200&q=80',
        displayOrder: 2,
        active: true,
      },
    ])
  }

  const processCount = await ProcessStep.countDocuments()
  if (processCount === 0) {
    await ProcessStep.create({
      stepNumber: 3,
      title: 'Seamless installation handled by professionals',
      description: 'End-to-end execution from site study and planning to commissioning and real-time monitoring.',
      image: 'https://images.unsplash.com/photo-1559302504-64aae6ca6b6d?auto=format&fit=crop&w=1800&q=80',
      displayOrder: 0,
    })
  }

  const productCount = await Product.countDocuments()
  if (productCount === 0) {
    await Product.insertMany([
      {
        name: 'SolarNova UltraCell 550W',
        category: 'Residential',
        description: 'Mono Standard Boost Series for all climates',
        image: 'https://images.unsplash.com/photo-1595437193398-f24279553f4f?auto=format&fit=crop&w=900&q=80',
        specifications: [],
        featured: false,
        displayOrder: 0,
      },
      {
        name: 'Suncryst EdgeTech 500W',
        category: 'Commercial',
        description: 'Module Dual-Layer PERC cell with AI control',
        image: 'https://images.unsplash.com/photo-1624397640148-949b1732bb0a?auto=format&fit=crop&w=900&q=80',
        specifications: [],
        featured: false,
        displayOrder: 1,
      },
      {
        name: 'HelioMax TriPhase 533W',
        category: 'Industrial',
        description: 'Panel precision engineered for solar efficiency',
        image: 'https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&w=900&q=80',
        specifications: [],
        featured: false,
        displayOrder: 2,
      },
    ])
  }

  const ctaCount = await CTA.countDocuments()
  if (ctaCount === 0) {
    await CTA.create({
      heading: 'Switch to the solar energy for a brighter world.',
      description: 'Reliable solutions from strategy to installation, built for long-term performance.',
      buttonOneText: 'Explore More',
      buttonOneLink: '#services',
      buttonTwoText: 'Book Now',
      buttonTwoLink: 'mailto:hello@xurya.energy',
    })
  }

  const contactCount = await Contact.countDocuments()
  if (contactCount === 0) {
    await Contact.create({
      phone: '',
      email: 'hello@xurya.energy',
      whatsapp: '',
      address: '',
      googleMapsUrl: '',
    })
  }

  const footerCount = await Footer.countDocuments()
  if (footerCount === 0) {
    await Footer.create({
      companyDescription: '',
      footerLinks: [
        { label: 'Privacy Policy', href: '#' },
        { label: 'Terms of Use', href: '#' },
        { label: 'About Us', href: '#about' },
        { label: 'Services', href: '#services' },
      ],
      socialLinks: [],
      copyright: 'Xurya.com - All Rights Reserved',
    })
  }

  console.log('Database seeded successfully')
}
