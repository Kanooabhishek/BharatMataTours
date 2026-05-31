# Image Sourcing Checklist

This file is the handoff sheet for replacing remote images with local images.

## Why This Is Needed

The current website uses images from external URLs. If those source websites delete the file, change the URL, block hotlinking, or load slowly, the image can break on our website too. The safer setup is to download properly licensed images, place them inside the project, and reference them locally.

Recommended folder:

```text
assets/images/
```

Recommended file rules:

- Use lowercase filenames.
- Use hyphens, not spaces.
- Prefer `.jpg` for photos and `.webp` if you are comfortable exporting optimized images.
- Use landscape images where possible.
- Minimum useful size: `1600px` wide.
- Hero images should ideally be `2000px` wide or larger.
- Avoid generic stock-looking images, dark photos, heavy blur, random people close-ups, and photos that do not clearly show the place.
- Please verify the license on the free image website before downloading.

## Exact Image Count

These are image placements in the current website. You can reuse the same filename in multiple rows if the same image fits more than one place.

| Section | Exact image placements |
|---|---:|
| Package page galleries | 65 |
| Destination page galleries | 65 |
| Seasonal month cards | 12 |
| Shared site/page hero areas | 38 |
| Total placements to account for | 180 |

Note: Package itinerary day banners can reuse images from the package and destination galleries. No separate day-by-day image set is required unless you want every itinerary day to have a unique image.

## Package Page Galleries

Each package page needs exactly 5 images. Image 1 should be the strongest hero image for that package.

| Route | Package | Images needed | Image 1 focus / keywords | Image 1 filename | Image 2 focus / keywords | Image 2 filename | Image 3 focus / keywords | Image 3 filename | Image 4 focus / keywords | Image 4 filename | Image 5 focus / keywords | Image 5 filename |
|---|---|---:|---|---|---|---|---|---|---|---|---|---|
| `#package-golden-triangle-tour` | GOLDEN TRIANGLE TOUR | 5 | Taj Mahal sunrise Agra |  | Amber Fort Jaipur |  | Hawa Mahal Jaipur facade |  | Agra Fort red sandstone |  | India Gate Delhi or Old Delhi heritage |  |
| `#package-golden-triangle-varanasi-ayodhya` | GOLDEN TRIANGLE + VARANASI + AYODHYA TOUR | 5 | Taj Mahal Agra |  | Varanasi Ganga Aarti ceremony |  | Ayodhya Ram Mandir exterior or Ayodhya ghats |  | Amber Fort or Hawa Mahal Jaipur |  | Kashi Vishwanath / Varanasi ghats |  |
| `#package-rama-krishna-spiritual-tour` | RAMA KRISHNA SPIRITUAL TOUR | 5 | Varanasi ghats sunrise boat |  | Mathura Krishna temple area |  | Vrindavan temple devotional scene |  | Ayodhya Ram Mandir or Saryu River aarti |  | Taj Mahal Agra |  |
| `#package-classic-spiritual-india-tour` | CLASSIC SPIRITUAL INDIA TOUR | 5 | Victoria Memorial Kolkata |  | Mahabodhi Temple Bodhgaya |  | Nalanda ruins Bihar |  | Varanasi Ganga Aarti |  | Ayodhya Ram Mandir or Saryu River |  |
| `#package-grand-south-india-tour` | GRAND SOUTH INDIA TOUR | 5 | Meenakshi Temple Madurai |  | Rameswaram Ramanathaswamy Temple corridor |  | Kerala backwaters houseboat |  | Munnar tea plantation |  | Mysore Palace illuminated or daytime |  |
| `#package-kerala-backwaters-hill-stations` | KERALA BACKWATERS & HILL STATIONS | 5 | Alleppey houseboat Kerala backwaters |  | Munnar tea gardens |  | Fort Kochi Chinese fishing nets |  | Kovalam beach |  | Padmanabhaswamy Temple Trivandrum |  |
| `#package-goa-mumbai-leisure-tour` | GOA & MUMBAI LEISURE TOUR | 5 | Goa beach Calangute or Baga |  | Panjim Goa colorful street |  | Mandovi River boat Goa |  | Gateway of India Mumbai |  | Marine Drive Mumbai sunset |  |
| `#package-kashmir-paradise-tour` | KASHMIR PARADISE TOUR | 5 | Dal Lake Srinagar shikara |  | Srinagar Mughal Gardens |  | Gulmarg meadows mountains |  | Pahalgam valley Lidder River |  | Kashmir houseboat or mountain landscape |  |
| `#package-kathmandu-nepal-tour` | KATHMANDU & NEPAL TOUR | 5 | Boudhanath Stupa Kathmandu |  | Pashupatinath Temple Kathmandu |  | Kathmandu Durbar Square |  | Phewa Lake Pokhara |  | Peace Pagoda Pokhara or Himalayan view |  |
| `#package-north-east-india-tour` | NORTH EAST INDIA TOUR | 5 | Shillong Meghalaya hills |  | Mawlynnong village Meghalaya |  | Living Root Bridge Meghalaya |  | Gangtok monastery Sikkim |  | Darjeeling tea garden with Kanchenjunga |  |
| `#package-andaman-nicobar-island-tour` | ANDAMAN & NICOBAR ISLAND TOUR | 5 | Port Blair Cellular Jail |  | Andaman turquoise beach |  | Andaman island boat excursion |  | White sand beach Andaman |  | Tropical clear water beach India |  |
| `#package-gujarat-heritage-tour` | GUJARAT HERITAGE TOUR | 5 | Statue of Unity Kevadia |  | Ahmedabad heritage architecture |  | Mount Abu Nakki Lake |  | Udaipur City Palace |  | Gujarat stepwell or heritage street |  |
| `#package-mp-heritage-tour` | MP HERITAGE TOUR | 5 | Gwalior Fort |  | Khajuraho temples |  | Orchha fort palace |  | Sanchi Stupa |  | Omkareshwar temple river |  |

## Destination Page Galleries

Each destination page needs exactly 5 images. These pages are used both on destination detail pages and destination cards.

| Route | Destination page | Images needed | Image 1 focus / keywords | Image 1 filename | Image 2 focus / keywords | Image 2 filename | Image 3 focus / keywords | Image 3 filename | Image 4 focus / keywords | Image 4 filename | Image 5 focus / keywords | Image 5 filename |
|---|---|---:|---|---|---|---|---|---|---|---|---|---|
| `#destination-delhi-agra` | Delhi and Agra | 5 | Taj Mahal Agra wide hero |  | Red Fort Delhi exterior |  | Agra Fort |  | Qutub Minar Delhi |  | India Gate Delhi |  |
| `#destination-jaipur-rajasthan` | Jaipur and Rajasthan | 5 | Hawa Mahal Jaipur |  | Amber Fort Jaipur |  | City Palace Jaipur |  | Jantar Mantar Jaipur |  | Jaipur local market colorful textiles |  |
| `#destination-varanasi-ayodhya` | Varanasi and Ayodhya | 5 | Varanasi Ganga Aarti |  | Varanasi ghats sunrise boat |  | Kashi Vishwanath / temple lane Varanasi |  | Ayodhya Ram Mandir exterior or Saryu River |  | Sarnath or spiritual Varanasi scene |  |
| `#destination-kolkata-bodhgaya` | Kolkata, Patna and Bodhgaya | 5 | Victoria Memorial Kolkata |  | Kali Temple Kolkata |  | Mahabodhi Temple Bodhgaya |  | Nalanda ruins |  | Patna Museum or Gandhi Maidan |  |
| `#destination-south-india` | Grand South India | 5 | Meenakshi Temple Madurai |  | Mahabalipuram Shore Temple |  | Brihadeeswara Temple Thanjavur |  | Mysore Palace |  | Chennai Marina Beach or city skyline |  |
| `#destination-kerala` | Kerala | 5 | Kerala backwaters houseboat |  | Munnar tea plantation |  | Fort Kochi Chinese fishing nets |  | Alleppey canal or backwater village |  | Kovalam beach |  |
| `#destination-goa-mumbai` | Goa and Mumbai | 5 | Goa beach |  | Basilica of Bom Jesus Goa |  | Gateway of India Mumbai |  | Marine Drive Mumbai |  | Panjim Goa colorful street or market |  |
| `#destination-kashmir` | Kashmir | 5 | Dal Lake shikara Srinagar |  | Mughal Gardens Srinagar |  | Gulmarg meadow |  | Pahalgam valley |  | Kashmir houseboat or mountain view |  |
| `#destination-nepal` | Kathmandu and Nepal | 5 | Boudhanath Stupa |  | Pashupatinath Temple |  | Kathmandu Durbar Square |  | Phewa Lake Pokhara |  | Peace Pagoda or Himalayan view |  |
| `#destination-north-east` | North East India | 5 | Shillong hills |  | Mawlynnong village |  | Living Root Bridge |  | Gangtok monastery |  | Darjeeling tea garden |  |
| `#destination-andaman` | Andaman and Nicobar Islands | 5 | Port Blair Cellular Jail |  | Andaman beach turquoise water |  | Island excursion boat |  | White sand beach |  | Tropical lagoon or coastline |  |
| `#destination-gujarat` | Gujarat, Mount Abu and Udaipur | 5 | Statue of Unity |  | Ahmedabad heritage walk architecture |  | Mount Abu Nakki Lake |  | Udaipur City Palace |  | Gujarat stepwell or temple detail |  |
| `#destination-mp-heritage` | MP Heritage | 5 | Gwalior Fort |  | Khajuraho temples |  | Orchha palace |  | Sanchi Stupa |  | Omkareshwar riverside temple |  |

## Seasonal Month Cards

Each month card needs exactly 1 backdrop image. The image should support the month story, not show package names.

| Route | Month card | Images needed | Image focus / keywords | Final image filename |
|---|---|---:|---|---|
| `#packages-season-jan` | January | 1 | Clear winter light, Jaipur palace, heritage city, soft winter travel India |  |
| `#packages-season-feb` | February | 1 | Romantic river ceremony, Varanasi evening aarti, pleasant winter travel |  |
| `#packages-season-mar` | March | 1 | Holi colors India, spring festival, colorful cultural travel |  |
| `#packages-season-apr` | April | 1 | Pokhara lake, Himalayan spring, blooming hills, fresh mountain air |  |
| `#packages-season-may` | May | 1 | Kashmir valley, mountain lake, cool hill escape, summer mountains |  |
| `#packages-season-jun` | June | 1 | Darjeeling or Sikkim mountain clouds, green hills, monsoon beginning |  |
| `#packages-season-jul` | July | 1 | Misty hills India, monsoon valleys, green mountain landscape |  |
| `#packages-season-aug` | August | 1 | Kerala backwaters green monsoon, Onam Kerala, lush tropical landscape |  |
| `#packages-season-sep` | September | 1 | Navratri garba, festive India, autumn festival atmosphere |  |
| `#packages-season-oct` | October | 1 | Diwali diyas, temple lights, festive India travel season |  |
| `#packages-season-nov` | November | 1 | Diwali lights, Indian bazaar evening, cool season travel |  |
| `#packages-season-dec` | December | 1 | Goa beach sunny December, South India beach, year-end holiday |  |

## Shared Site And Listing Images

These images support site-wide sections, listing page heroes, and homepage shortcuts. They can reuse files from the package and destination tables if the image is strong enough.

| Page / component | Route or usage | Images needed | Required image focus | Final image filenames |
|---|---|---:|---|---|
| Home hero slideshow | `#home` first screen | 10 | Strong India/Nepal travel overview: Taj Mahal, Varanasi, South India temple, Kerala backwaters, North East/Kanchenjunga, Mumbai, Nepal stupa, Jaipur, Kolkata, Goa beach | 1.  <br>2.  <br>3.  <br>4.  <br>5.  <br>6.  <br>7.  <br>8.  <br>9.  <br>10.  |
| Home story shortcuts | `#home` popular destination strip | 10 | Small thumbnail set: Delhi Agra, Jaipur, Varanasi Ayodhya, Kolkata Bodhgaya, Kerala, South India, Goa Mumbai, Kashmir, Nepal, North East India | 1.  <br>2.  <br>3.  <br>4.  <br>5.  <br>6.  <br>7.  <br>8.  <br>9.  <br>10.  |
| Packages listing hero | `#packages` | 8 | Mix of top package visuals: Taj Mahal, South India temple, Kerala backwaters, Varanasi ghats, North East mountains, Mumbai, Nepal, Goa | 1.  <br>2.  <br>3.  <br>4.  <br>5.  <br>6.  <br>7.  <br>8.  |
| Seasonal page hero carousel | `#seasonal` | 5 | Festival and season visuals: Holi colors, Diwali diyas, Varanasi aarti, Durga Puja Kolkata, Onam Kerala | 1.  <br>2.  <br>3.  <br>4.  <br>5.  |
| About page hero | `#about` | 1 | Warm guided travel / Jaipur Amber Fort / heritage India |  |
| Destinations listing hero | `#destinations` | 1 | Red Fort Delhi or strong India heritage hero |  |
| Travel guide hero | `#guide` | 1 | India Gate Delhi or calm traveler-friendly India city landmark |  |
| FAQs hero | `#faqs` | 1 | Kerala landscape or welcoming India travel scene |  |
| Contact hero | `#contact` | 1 | Friendly travel planning image, Indian textile desk, map, welcoming destination detail |  |

## Suggested Folder Layout

You can keep all final files flat in one folder:

```text
assets/images/
```

Example filenames:

```text
pkg-golden-triangle-01-taj-mahal.jpg
pkg-golden-triangle-02-amber-fort.jpg
dest-kerala-01-backwaters.jpg
season-mar-holi-colors.jpg
home-hero-01-taj-mahal.jpg
```

## After You Fill This File

Send back this same markdown file with the filename fields filled in, and place the image files inside:

```text
assets/images/
```

Then I can replace the external URLs in `app.js` with local asset paths and run a full visual check.
