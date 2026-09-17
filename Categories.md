# Electronics Store Category Taxonomy

## 1. Store Definition

This document defines a structured taxonomy for an electronics store that sells consumer electronics, computer equipment, accessories, smart-home products, and related technology items. An AI system should interpret each top-level section as a **main category** and the items beneath it as **subcategories, product types, use cases, or search metadata**.

The taxonomy is designed to support product organization, navigation menus, search, filtering, product recommendations, related-product suggestions, and intent-based shopping experiences.

---

## 2. Data and Classification Rules

Each category should use the following fields:

| Field | Meaning |
|---|---|
| `category_id` | A unique, stable identifier for the category. |
| `category_name` | The customer-facing English name of the category. |
| `description` | A concise explanation of what belongs in the category. |
| `subcategories` | More specific product groups inside the category. |
| `product_examples` | Examples of products that belong to the category. |
| `use_cases` | Customer needs and situations related to the category. |
| `related_categories` | Categories that can be recommended together with this category. |
| `search_keywords` | Common search terms, synonyms, and product phrases. |

A product should have one primary category. It may also be connected to related categories when it serves more than one use case. For example, a **wireless charger** can belong primarily to `mobile_and_accessories` and can also be related to `power_and_charging`.

---

## 3. Main Product Categories

### 3.1 Mobile Phones and Accessories

- **category_id:** `mobile_and_accessories`
- **category_name:** Mobile Phones and Accessories
- **description:** Smartphones, phone protection products, charging accessories, and other accessories used with mobile phones.
- **subcategories:**
  - Smartphones
  - Phone Cases
  - Screen Protectors
  - Wall Chargers
  - Charging and Data Cables
  - Wireless Chargers
  - Power Banks
  - Phone Holders
  - Car Phone Accessories
  - SIM Card Accessories
- **product_examples:** Smartphone, phone case, screen protector, fast charger, USB-C cable, power bank, car phone holder.
- **use_cases:** Buying a new phone, protecting a phone, charging a phone, using a phone in a car, and traveling.
- **related_categories:** Audio and Headphones, Power and Charging, Photography and Content Creation.
- **search_keywords:** smartphone, mobile phone, phone case, screen protector, phone charger, charging cable, power bank, phone holder.

### 3.2 Computers and Laptops

- **category_id:** `computers_and_laptops`
- **category_name:** Computers and Laptops
- **description:** Personal computing devices for work, study, home use, productivity, programming, design, and everyday tasks.
- **subcategories:**
  - Laptops
  - Desktop Computers
  - Mini PCs
  - Tablets
  - Computer Monitors
  - Laptop Stands
  - Laptop Bags
  - Computer Accessories
- **product_examples:** Laptop, desktop computer, mini PC, tablet, laptop cooling pad, laptop stand, laptop bag.
- **use_cases:** Studying, working from home, programming, graphic design, office work, everyday computing, and travel.
- **related_categories:** Computer Accessories, Storage and Memory, Networking and Internet, Gaming.
- **search_keywords:** laptop, notebook, desktop PC, personal computer, mini PC, tablet, laptop stand, laptop bag.

### 3.3 Displays and Projectors

- **category_id:** `displays_and_projectors`
- **category_name:** Displays and Projectors
- **description:** Products used to display video, images, presentations, documents, or other visual content.
- **subcategories:**
  - Televisions
  - Smart TVs
  - Computer Monitors
  - Gaming Monitors
  - Projectors
  - Monitor Stands and Mounts
  - HDMI Cables
  - DisplayPort Cables
  - Display Adapters
- **product_examples:** Smart TV, computer monitor, gaming monitor, projector, monitor arm, HDMI cable, DisplayPort adapter.
- **use_cases:** Watching movies, working, studying, gaming, presentations, meetings, and home entertainment.
- **related_categories:** Audio and Headphones, Gaming, Cables and Adapters, Smart Home and Security.
- **search_keywords:** TV, Smart TV, monitor, gaming monitor, projector, HDMI, DisplayPort, monitor stand.

### 3.4 Computer Accessories

- **category_id:** `computer_accessories`
- **category_name:** Computer Accessories
- **description:** Accessories that improve computer functionality, comfort, connectivity, or productivity.
- **subcategories:**
  - Keyboards
  - Mice
  - Mouse Pads
  - Webcams
  - USB Hubs
  - Laptop Stands
  - Laptop Cooling Pads
  - Card Readers
  - Computer Adapters
  - Presentation Remotes
- **product_examples:** Wireless keyboard, gaming mouse, mouse pad, webcam, USB hub, laptop stand, cooling pad, card reader.
- **use_cases:** Office work, studying, video meetings, improving comfort, adding ports, and increasing productivity.
- **related_categories:** Gaming, Audio and Headphones, Storage and Memory, Computers and Laptops.
- **search_keywords:** keyboard, mouse, webcam, USB hub, laptop stand, cooling pad, computer accessories.

### 3.5 Audio and Headphones

- **category_id:** `audio_and_headphones`
- **category_name:** Audio and Headphones
- **description:** Products used for listening to, recording, amplifying, or communicating with sound.
- **subcategories:**
  - Earbuds
  - Over-Ear Headphones
  - Bluetooth Headphones
  - Computer Speakers
  - Bluetooth Speakers
  - Soundbars
  - Microphones
  - Audio Adapters
  - Portable Speakers
- **product_examples:** Wireless earbuds, over-ear headphones, Bluetooth speaker, soundbar, USB microphone, computer speakers.
- **use_cases:** Listening to music, phone calls, watching movies, gaming, recording audio, online meetings, and content creation.
- **related_categories:** Mobile Phones and Accessories, Gaming, Photography and Content Creation, Displays and Projectors.
- **search_keywords:** earbuds, headphones, headset, Bluetooth speaker, soundbar, microphone, computer speakers, wireless audio.

### 3.6 Gaming

- **category_id:** `gaming`
- **category_name:** Gaming
- **description:** Devices and accessories designed to improve gaming on PCs, consoles, mobile devices, and other gaming platforms.
- **subcategories:**
  - Gaming Keyboards
  - Gaming Mice
  - Gaming Headsets
  - Game Controllers
  - Gaming Chairs
  - Racing Wheels and Pedals
  - RGB Lighting
  - Gaming Monitors
  - Console Stands
  - Mobile Gaming Accessories
- **product_examples:** Game controller, gaming headset, RGB mouse, mechanical keyboard, gaming chair, racing wheel, gaming monitor.
- **use_cases:** PC gaming, console gaming, mobile gaming, competitive gaming, livestreaming, and improving the gaming setup.
- **related_categories:** Audio and Headphones, Displays and Projectors, Computer Accessories, Power and Charging.
- **search_keywords:** gaming, gamer, RGB, mechanical keyboard, game controller, gaming headset, gaming chair, gaming monitor.

### 3.7 Networking and Internet

- **category_id:** `networking_and_internet`
- **category_name:** Networking and Internet
- **description:** Products used to create, distribute, extend, manage, or improve wired and wireless internet networks.
- **subcategories:**
  - Wi-Fi Routers
  - Wi-Fi Extenders
  - Mesh Wi-Fi Systems
  - Network Switches
  - Ethernet Cables
  - Network Adapters
  - Wireless Access Points
  - Network Cable Management
- **product_examples:** Wi-Fi router, Wi-Fi extender, mesh system, network switch, Ethernet cable, USB network adapter.
- **use_cases:** Improving Wi-Fi coverage, creating a home network, connecting multiple devices, and supporting office networks.
- **related_categories:** Smart Home and Security, Cables and Adapters, Power and Charging.
- **search_keywords:** router, Wi-Fi, Wi-Fi extender, mesh Wi-Fi, network switch, Ethernet cable, home network.

### 3.8 Storage and Memory

- **category_id:** `storage_and_memory`
- **category_name:** Storage and Memory
- **description:** Products used to save, transfer, back up, or expand digital storage for computers, phones, cameras, and other devices.
- **subcategories:**
  - USB Flash Drives
  - External Hard Drives
  - External SSDs
  - Internal SSDs
  - HDDs
  - Memory Cards
  - Memory Card Readers
  - Hard Drive Enclosures
- **product_examples:** USB flash drive, external hard drive, portable SSD, internal SSD, HDD, microSD card, card reader.
- **use_cases:** Saving files, creating backups, expanding laptop storage, storing photos and videos, and transferring data.
- **related_categories:** Computers and Laptops, Photography and Content Creation, Cables and Adapters.
- **search_keywords:** storage, hard drive, HDD, SSD, flash drive, USB drive, memory card, external drive, backup.

### 3.9 Power and Charging

- **category_id:** `power_and_charging`
- **category_name:** Power and Charging
- **description:** Products used to charge devices, distribute electricity, protect electronics, or provide backup power.
- **subcategories:**
  - Wall Chargers
  - Fast Chargers
  - Wireless Chargers
  - Charging Cables
  - Power Banks
  - Power Strips
  - Surge Protectors
  - UPS Systems
  - Power Adapters
- **product_examples:** Fast charger, wireless charger, power bank, power strip, surge protector, UPS, power adapter.
- **use_cases:** Charging devices, traveling, protecting electronics, working during power interruptions, and organizing power sources.
- **related_categories:** Mobile Phones and Accessories, Computers and Laptops, Smart Home and Security, Networking and Internet.
- **search_keywords:** charger, fast charger, wireless charger, power bank, power strip, surge protector, UPS, power adapter.

### 3.10 Smart Home and Security

- **category_id:** `smart_home_and_security`
- **category_name:** Smart Home and Security
- **description:** Connected devices that help customers monitor, secure, automate, or control their homes.
- **subcategories:**
  - Security Cameras
  - Smart Doorbells
  - Smart Light Bulbs
  - Smart Plugs
  - Motion Sensors
  - Door and Window Sensors
  - Smart Remote Controls
  - Smart Displays
  - Smart Speakers
- **product_examples:** Indoor security camera, outdoor security camera, smart bulb, smart plug, motion sensor, smart doorbell.
- **use_cases:** Home monitoring, lighting control, home security, energy management, remote control, and automation.
- **related_categories:** Networking and Internet, Power and Charging, Audio and Headphones.
- **search_keywords:** smart home, security camera, smart bulb, smart plug, motion sensor, smart doorbell, home security.

### 3.11 Photography and Content Creation

- **category_id:** `photography_and_content_creation`
- **category_name:** Photography and Content Creation
- **description:** Equipment used to record photos, videos, audio, livestreams, podcasts, online lessons, and other digital content.
- **subcategories:**
  - Tripods and Stands
  - Ring Lights
  - Video Lights
  - Recording Microphones
  - Phone Gimbals
  - Smartphone Mounts
  - Camera Webcams
  - Backgrounds
  - Memory Cards
  - Livestreaming Equipment
- **product_examples:** Tripod, ring light, USB microphone, phone gimbal, smartphone holder, webcam, memory card.
- **use_cases:** Recording videos, livestreaming, online meetings, online teaching, podcasting, product photography, and social media content.
- **related_categories:** Audio and Headphones, Storage and Memory, Mobile Phones and Accessories, Power and Charging.
- **search_keywords:** content creation, photography, videography, ring light, tripod, microphone, livestreaming, podcast equipment.

### 3.12 Cables and Adapters

- **category_id:** `cables_and_adapters`
- **category_name:** Cables and Adapters
- **description:** Products used to charge devices, transfer data, connect hardware, or convert one connector or interface into another.
- **subcategories:**
  - USB Cables
  - USB-C Cables
  - Lightning Cables
  - HDMI Cables
  - DisplayPort Cables
  - USB-C Adapters
  - HDMI Adapters
  - Audio Adapters
  - Ethernet Cables
  - Multiport Hubs
- **product_examples:** USB-C charging cable, Lightning cable, HDMI cable, USB-C hub, HDMI adapter, audio adapter, Ethernet cable.
- **use_cases:** Charging, data transfer, connecting displays, connecting audio equipment, and connecting network devices.
- **related_categories:** Mobile Phones and Accessories, Displays and Projectors, Computers and Laptops, Networking and Internet, Power and Charging.
- **search_keywords:** cable, adapter, connector, USB-C, HDMI, Lightning, DisplayPort, Ethernet, USB hub.

---

## 4. Customer Need-Based Collections

These collections should be used in addition to the main product categories. They help customers shop by goal rather than by technical product name.

| Customer need | Recommended categories | Example products |
|---|---|---|
| Student setup | Computers and Laptops, Storage and Memory, Computer Accessories | Laptop, wireless mouse, USB flash drive, headset, laptop stand |
| Work-from-home setup | Computers and Laptops, Audio and Headphones, Networking and Internet, Computer Accessories | Webcam, headset, router, keyboard, monitor |
| Gaming setup | Gaming, Displays and Projectors, Audio and Headphones, Computer Accessories | Gaming monitor, gaming headset, controller, RGB keyboard, gaming mouse |
| Content creator setup | Photography and Content Creation, Audio and Headphones, Storage and Memory, Mobile Phones and Accessories | Microphone, ring light, tripod, memory card, phone gimbal |
| Travel electronics | Mobile Phones and Accessories, Power and Charging, Storage and Memory, Audio and Headphones | Power bank, travel charger, wireless earbuds, charging cable |
| Smart home setup | Smart Home and Security, Networking and Internet, Power and Charging | Security camera, smart bulb, smart plug, Wi-Fi router |
| Better home internet | Networking and Internet, Cables and Adapters, Power and Charging | Mesh Wi-Fi system, Wi-Fi extender, Ethernet cable, UPS |
| Device protection | Mobile Phones and Accessories, Power and Charging, Storage and Memory | Phone case, screen protector, surge protector, external backup drive |

---

## 5. Related Product Recommendation Rules

The AI should recommend products that directly complement the product being viewed. Recommendations must be useful and should not be random cross-selling.

| Viewed product | Recommended related products |
|---|---|
| Smartphone | Phone case, screen protector, wall charger, charging cable, wireless earbuds |
| Laptop | Wireless mouse, laptop bag, cooling pad, USB-C hub, external SSD |
| Computer monitor | HDMI cable, DisplayPort cable, monitor arm, speakers, webcam |
| Security camera | Memory card, Wi-Fi router, power adapter, UPS system |
| Gaming setup | Gaming headset, gaming mouse, mechanical keyboard, gaming monitor, gaming chair |
| Wi-Fi router | Wi-Fi extender, mesh system, Ethernet cable, network switch, UPS |
| USB microphone | Microphone stand, pop filter, headphones, ring light, USB hub |

---

## 6. Recommended Product Data Schema

Every product should contain structured fields so that the website, search engine, filters, and AI assistant can understand it consistently.

```yaml
product_id: unique_product_identifier
product_name: customer-facing English product name
brand: manufacturer or brand name
main_category_id: primary category identifier
subcategory: specific product group
price: numeric product price
currency: price currency
availability: in_stock, out_of_stock, or coming_soon
condition: new, refurbished, or used
short_description: concise product description
key_features: list of important product features
specifications: structured technical specifications
compatible_devices: compatible phones, computers, consoles, or accessories
use_cases: customer situations where the product is useful
related_product_ids: identifiers of complementary products
search_keywords: search terms, synonyms, and common phrases
warranty: warranty information
images: product image URLs
```

---

## 7. Search and Filtering Rules

The store should support English product names, common abbreviations, synonyms, and technical terms. Search should understand that the following terms may refer to related concepts:

| Search term group | Related terms |
|---|---|
| Mobile phone | Smartphone, cell phone, mobile phone, phone |
| Laptop | Notebook, laptop computer, portable computer |
| Headphones | Headset, earbuds, earphones, wireless headphones |
| Router | Wi-Fi router, wireless router, internet router |
| Storage drive | Hard drive, HDD, SSD, external drive, USB drive |
| Gaming keyboard | Mechanical keyboard, RGB keyboard, gamer keyboard |
| Webcam | USB camera, computer camera, video camera |

Filters should depend on the product type. Laptop filters may include screen size, processor, RAM, storage capacity, operating system, and price. Headphone filters may include connection type, form factor, microphone availability, battery life, and noise cancellation. Storage filters may include capacity, interface, drive type, and compatibility.

The AI must distinguish between similar products when the distinction affects the customer decision. For example, **HDD** and **SSD** should not be treated as identical products, and a **gaming monitor** should remain distinguishable from a standard office monitor.

---

## 8. Customer Intent Mapping

The AI should map the customer's request to the most relevant category or collection.

| Customer request | Recommended category or collection |
|---|---|
| “I want a new phone.” | Mobile Phones and Accessories |
| “I need a fast charger.” | Power and Charging; optionally Mobile Phones and Accessories |
| “I need something for gaming.” | Gaming |
| “The Wi-Fi signal is weak at home.” | Networking and Internet |
| “I want to record videos.” | Photography and Content Creation |
| “I need more storage.” | Storage and Memory |
| “I need a camera for my house.” | Smart Home and Security |
| “I want to connect my laptop to my TV.” | Cables and Adapters; Displays and Projectors |
| “I need headphones for calls.” | Audio and Headphones |
| “I want to build a home office.” | Customer collection: Work-from-home setup |

If a customer request has more than one reasonable interpretation, the AI should ask one short clarification question before recommending products. For example: “Are you looking for a phone charger, a laptop charger, or a universal charger?”

---

## 9. Instructions for the AI System

When using this taxonomy, the AI should follow these rules:

1. Identify the customer's intent before selecting a category.
2. Map a clearly mentioned product to the closest primary category.
3. If the request is broad, suggest a small number of relevant categories and explain the difference between them.
4. Recommend products that are relevant to the customer's stated need.
5. Recommend complementary products only when they provide clear value.
6. Use the English category names exactly as defined in this document.
7. Treat the product name and the category name as separate concepts. For example, “laptop” is a product type, while “Computers and Laptops” is a category.
8. Distinguish primary devices from accessories. A smartphone is a primary device; a phone case and charger are accessories.
9. Preserve the category IDs exactly because they may be used in the database, API, URLs, and product records.
10. Do not invent a new category when an existing category is suitable.
11. Ask a short clarification question when the customer's request is ambiguous.
12. Use product specifications and compatibility information before making technical recommendations.
13. Do not claim that a product is compatible with a device unless the compatibility data confirms it.

---

## 10. Recommended Main Navigation

```text
Home
├── Mobile Phones and Accessories
├── Computers and Laptops
├── Displays and Projectors
├── Computer Accessories
├── Audio and Headphones
├── Gaming
├── Networking and Internet
├── Storage and Memory
├── Power and Charging
├── Smart Home and Security
├── Photography and Content Creation
└── Cables and Adapters
```

## 11. Recommended Launch Order

For the first version of the store, prioritize categories that are easy for customers to understand and that connect naturally with many other products. The recommended launch order is **Mobile Phones and Accessories, Computers and Laptops, Audio and Headphones, Computer Accessories, Gaming, Networking and Internet, Storage and Memory, and Power and Charging**.

Smart Home and Security, Photography and Content Creation, and Cables and Adapters can be expanded gradually as the product catalog grows. Every category page should contain a concise description, subcategories, relevant filters, product cards, and related-product recommendations.

The same `category_id` should be used in the database, product records, website URLs, search indexes, and application programming interfaces. This prevents inconsistencies between the category name displayed to customers and the category used by the store's technical systems.
