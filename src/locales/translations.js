// Site interface text. Import with: import { translations } from "../locales/translations";
// Select a language: const text = translations["uk"];
// Plain text: text.navbar.catalog
// Dynamic text: text.search.resultsFor(query), text.common.discountWithPercent(discount)
// Arrays: text.returnsExchanges.steps.map(({ title, text }) => ...)
// Keep category/style/size IDs and API values unchanged; translate only display labels.
// Product names/descriptions/features from the database need their own translations.
// Link labels are plain text: keep <Link> elements in JSX when connecting the copy.
// Language switching and persistence are managed by App.

export const translations = {
  en: {
    common: {
      home: "Home",
      catalog: "Catalog",
      cart: "Cart",
      account: "Account",
      cancel: "Cancel",
      close: "Close",
      delete: "Delete",
      save: "Save",
      loading: "Loading",
      tryAgain: "Try again",
      backHome: "Back to home",
      continueShopping: "Continue Shopping",
      seeProduct: "See product",
      unavailable: "Unavailable",
      quantity: "Quantity",
      size: "Size",
      color: "Color",
      orderSummary: "Order Summary",
      subtotal: "Subtotal",
      discount: "Discount",
      deliveryFee: "Delivery Fee",
      total: "Total",
      email: "Email",
      support: "Support",
      genericError: "Something went wrong. Please try again.",
      discountWithPercent: (percent) => `Discount (-${percent}%)`,
      rating: (rating) => `${rating} out of 5 stars`,
    },
    navbar: {
      catalog: "Catalog",
      spotlight: "Spotlight",
      searchTitle: "LOOKING FOR SOMETHING?",
      search: "Search for products",
      searchPlaceholder: "Search for jeans, hoodies, and more…",
      searchIcon: "search",
      cart: "Cart",
      account: "Account",
      home: "WEA.R home",
      openMenu: "Open navigation menu",
      closeMenu: "Close navigation menu",
      openContacts: "Open contact information",
      cartWithCount: (count) => `Cart, ${count} items`,
    },
    categories: {
      pants: "Pants",
      hoodies: "Hoodies",
      jeans: "Jeans",
      "t-shirts": "T-Shirts",
      outerwear: "Outerwear",
    },
    sizes: {
      S: "Small",
      M: "Medium",
      L: "Large",
      XL: "X-Large",
      XXL: "XX-Large",
    },
    styles: {
      casual: "Casual",
      formal: "Formal",
      gym: "Gym",
      party: "Party",
    },
    footer: {
      description:
        "Simple everyday clothes designed to fit your unique style and bring comfort to your routine.",
      catalog: "Catalog",
      services: "Services",
      about: "About Us",
      support: "Support",
      deliveryPayment: "Delivery & Payment",
      returnsExchanges: "Returns & Exchanges",
      sizeGuide: "Size Guide",
      contacts: "Contacts",
      rights: "All rights reserved.",
      privacyPolicy: "Privacy Policy",
    },
    contactMenu: {
      title: "Contact us",
      close: "Close contact information",
      phoneNumbers: "Phone numbers",
      workingHours: "Working hours",
      contactInformation: "Contact information",
      socialNetworks: "Social networks",
      address: "123 Fashion Street, Lviv",
      workHours: "Mon - Sun: 9:00 - 21:00",
    },
    app: {
      mainContent: "Main content",
      accountDeleted: "Account was successfully deleted.",
      closeAccountDeleted: "Close account deletion message",
      demoNotice:
        "Demo site — please don't use real personal or payment details.",
      closeDemoNotice: "Close demo site notice",
    },
    home: {
      title: "Wear what feels right",
      descriptionLine1: "Simple clothes for every day.",
      descriptionLine2: "Made to fit your style.",
      viewCollection: "View collection",
      statistics: "Store statistics",
      qualityLine1: "high-quality",
      qualityLine2: "Products",
      customersLine1: "happy",
      customersLine2: "Customers",
      heroImageAlt: "Model wearing a black zip-up hoodie",
      collection: "The Collection",
      loadError: "We couldn’t load the products. Please try again.",
      loadingCollection: "Loading collection",
      comingSoon: "New products are coming soon.",
      viewAll: "View All",
      shopByCategory: "SHOP BY CATEGORY",
      storyTitle: "OUR STORY",
      storyHeadingLine1: "EVERYDAY CLOTHING.",
      storyHeadingLine2: "INDIVIDUAL STYLE.",
      tagline: "Wear it your way.",
      storyImageAlt: "Everyday clothing hanging on a rack",
      guideTitle: "Welcome to the W.EAR online store",
      whyShop: "Why shop at W.EAR?",
      staplesIntro: "Explore the everyday staples in our online store:",
      detailsTitle: "The details that make a difference",
      detailsIntro: "Here are a few things to consider:",
      chooseTitle: "How to choose your next everyday favourite",
      benefits: [
        "Quality. Well-finished details and fabrics suited to everyday wear.",
        "Versatility. Simple pieces that work with the clothes you already own.",
        "Style. Familiar silhouettes with room for your own interpretation.",
        "Practicality. Layers and essentials for different seasons and occasions.",
        "Comfort. A fit that lets you move freely throughout your day.",
      ],
      staples: [
        "T-shirts — an easy starting point for casual outfits and layering.",
        "Jeans — a wardrobe staple to dress up or keep relaxed.",
        "Hoodies — comfortable layers for laid-back days.",
        "Outerwear — the finishing touch when the temperature drops.",
      ],
      detailsList: [
        "Fabric — choose a material that suits the weather and your routine.",
        "Fit — compare relaxed, regular, and fitted shapes to find your preference.",
        "Layers — leave enough room to wear your favourite pieces together.",
        "Details — look at pockets, fastenings, cuffs, and seams.",
        "Care — follow the garment’s care label to help keep it looking its best.",
      ],
      storyIntro:
        "W.EAR brings together everyday pieces with a simple idea: getting dressed should feel natural. Familiar shapes, understated colours, and room to make each look your own.",
      storyEveryday:
        "From the jeans you reach for every morning to the layer you take everywhere, we’re drawn to clothing that fits into your life. Easy to combine, easy to wear, and always open to a different interpretation.",
      guideIntro:
        "Discover everyday clothing that fits your life and your style. Explore our collection of jeans, T-shirts, hoodies, and outerwear, and put together a wardrobe you’ll love to wear.",
      benefitsIntro:
        "Great outfits start with pieces that feel right. When choosing your next wardrobe essential, look for:",
      findFavourite:
        "Browse the collection to find a new favourite or build a look around the essentials. A few thoughtfully chosen pieces can open up plenty of possibilities.",
      detailsText:
        "The right clothing balances how it looks with how it feels. Check each product’s description and photos to get to know its fabric, shape, and finishing details before you choose.",
      chooseOccasion:
        "Start with how you’ll wear it. Whether you’re getting dressed for a busy day, a relaxed weekend, or a change in season, choose pieces that suit your plans and feel natural to you.",
      chooseFilters:
        "Use the catalog’s categories and filters to narrow down your options. Take a closer look at the product photos and available sizes, and consider how each piece will work with the rest of your wardrobe.",
      chooseFit:
        "Think about your preferred fit, too. Allow room for movement and any layers you plan to wear underneath. Finish with colours and shapes you enjoy, and make the look your own.",
      shopCategory: (category) => `Shop ${category}`,
    },
    homeCollection: {
      products: "Collection products",
      chooseSlide: "Choose collection slide",
      pause: "Pause slideshow",
      resume: "Resume slideshow",
      slidePosition: (current, total) => `${current} of ${total}`,
      goToProduct: (number) => `Go to product ${number}`,
    },
    catalog: {
      title: "CATALOG",
      loadErrorTitle: "Failed to load products",
      loadError: "We couldn’t load the products. Please try again later",
      filters: "Filters",
      closeFilters: "Close filters",
      filterRegion: "Catalog filters",
      sortBy: "Sort by:",
      sortLabel: "Sort by",
      price: "Price",
      size: "Size",
      dressStyle: "Dress Style",
      applyFilter: "Apply filter",
      resetFilter: "Reset Filter",
      emptyTitle: "No products found",
      emptyText: "Try changing your filters to see more products.",
      showingItems: (start, end, total) =>
        `showing ${start}-${end} of ${total} items`,
    },
    sortOptions: {
      popular: "More Popular",
      priceDescending: "More Expensive",
      priceAscending: "Cheaper",
    },
    pagination: {
      label: "Catalog pages",
      previous: "Previous",
      next: "Next",
      first: "First page",
      last: "Last page",
      more: "More pages",
    },
    search: {
      filterRegion: "Search filters",
      empty: "No products found.",
      resultsFor: (query) => `Results for "${query}"`,
    },
    product: {
      added: "Added to cart.",
      closeAdded: "Close cart message",
      loadError: "Unable to load product.",
      selectColor: "Select Color",
      selectSize: "Select Size",
      outOfStock:
        "Product with selected size and color is currently out of stock",
      decreaseQuantity: "Decrease quantity",
      increaseQuantity: "Increase quantity",
      maxQuantity: "You've reached the available quantity for this size.",
      adding: "ADDING",
      addToCart: "ADD TO CART",
      chooseVariant: "Choose a color and size before adding this product.",
      addError: "Unable to add this product to your cart. Please try again.",
      details: "Product details",
      detailsCare: "Details & Care",
      features: "Product Features",
      material: "Material",
      fit: "Fit",
      gender: "Gender",
      season: "Season",
      madeIn: "Made in",
      care: "Care",
      keepBrowsing: "Keep browsing",
      goToCart: "Go to cart",
      frontImageAlt: (name) => `${name} front view`,
      backImageAlt: (name) => `${name} back view`,
    },
    cart: {
      title: "Your cart",
      size: "Size:",
      color: "Color:",
      noMoreStock: "No more in stock",
      clear: "Clear Cart",
      empty: "Your cart is empty",
      emptyText: "Looks like you haven't added anything to your cart yet.",
      checkout: "Go to checkout",
      information: "Shopping information",
      deliveryTitle: "Delivery",
      beforeOrderTitle: "Before You Order",
      helpTitle: "Need Help?",
      recommendations: "You May Also Like",
      recommendationsText: "A few more pieces to explore.",
      viewAllProducts: "View all products",
      deliveryText:
        "Choose your preferred delivery method and enter your shipping details at checkout. Check your address and contact number carefully so your order can reach you. Review the delivery fee in your order summary before placing your order.",
      beforeOrderText:
        "Double-check your selected sizes, colors, and quantities before proceeding to checkout. You can adjust quantities or remove items directly in your cart. If you’re unsure about a piece, revisit its product page to review the photos and details.",
      helpText:
        "Have a question about a product or your order? Use the contact information in the footer to get in touch. Include the product name or, if you’ve already placed an order, your order reference to help us understand your question.",
    },
    checkout: {
      title: "CHECKOUT",
      intro: "Complete your details to place your order.",
      contactDetails: "CONTACT DETAILS",
      emailPlaceholder: "you@example.com",
      phoneOptional: "Phone number (optional)",
      phonePlaceholder: "+380 67 123 45 67",
      delivery: "DELIVERY",
      deliveryMethod: "Delivery method",
      postOffice: "Post office",
      homeDelivery: "Home delivery",
      city: "City",
      cityPlaceholder: "Enter your city",
      branchNumber: "Branch number",
      branchPlaceholder: "e.g. 12",
      homeAddress: "Home address",
      addressPlaceholder: "Street, building, apartment",
      payment: "PAYMENT",
      paymentMethod: "Payment method",
      cash: "Cash on delivery",
      card: "Card",
      cardNumber: "Card number",
      cardNumberPlaceholder: "1234 5678 9012 3456",
      cardholderName: "Cardholder name",
      cardholderPlaceholder: "Name as shown on card",
      expiration: "Expiration date",
      expirationPlaceholder: "MM/YY",
      cvv: "CVV",
      cvvPlaceholder: "123",
      placeOrder: "Place order",
      continueShopping: "Continue shopping",
      addressHint:
        "Enter street and building, with an optional apartment (maximum 3 words).",
      itemQuantity: (count) => `x${count}`,
    },
    checkoutErrors: {
      emailRequired: "Email is required",
      emailInvalid: "Please enter a valid email address",
      phoneInvalid: "Please enter a valid phone number",
      cityRequired: "City is required",
      cityInvalid: "Please enter a valid city name",
      branchRequired: "Post office branch is required",
      branchInvalid: "Please enter a valid branch number",
      addressRequired: "Delivery address is required",
      addressInvalid: "Please enter a valid delivery address",
      cardNumberRequired: "Card number is required",
      cardNumberInvalid: "Please enter a valid card number",
      cardholderRequired: "Cardholder name is required",
      cardholderInvalid: "Please enter a valid cardholder name",
      expirationRequired: "Expiration date is required",
      expirationInvalid: "Invalid expiration date",
      cvvRequired: "CVV is required",
      cvvInvalid: "Please enter a valid CVV",
      requiredFields:
        "Please fill in all required fields before placing your order.",
      loadCart: "Failed to load cart data",
    },
    auth: {
      createAccount: "Create an account",
      logIn: "Log in",
      register: "Register",
      email: "Email",
      password: "Password",
      emailPlaceholder: "Enter your email address",
      createPasswordPlaceholder: "Create a password (8–128 characters)",
      passwordPlaceholder: "Enter your password",
      hidePassword: "Hide password",
      showPassword: "Show password",
      emailEmpty: "Please do not leave email empty.",
      emailInvalid: "Please enter a valid email address.",
      passwordEmpty: "Please do not leave password empty.",
      passwordLength: "Password must contain 8 to 128 characters",
      sending: "Sending",
      googleRedirect: "Redirecting to Google...",
      googleContinue: "Continue with Google",
      hasAccount: "Already have an account?",
      noAccount: "Don’t have an account?",
      signInFailed: "Sign-in failed",
      accountExists:
        "An account with this email already exists. Please log in using your existing method.",
      googleUnavailable:
        "Google sign-in is not configured yet. Please use email and password.",
      googleFailed:
        "Google sign-in failed. Please try again or use email and password.",
      googleStartError: "Unable to start Google sign-in",
      backToAuth: "Back to login / registration",
    },
    account: {
      signedInAs: "SIGNED IN AS",
      orders: "My orders",
      ordersDescription: "View orders history and status",
      cart: "My cart",
      cartDescription: "Return to your shopping cart",
      settings: "Account settings",
      settingsDescription: "Change account details",
      logOut: "Log out",
    },
    accountSettings: {
      title: "Account settings",
      profile: "Profile",
      yourName: "Your name",
      namePlaceholder: "your name",
      name: "Name",
      mobileNumber: "Mobile number",
      addNumber: "Add number",
      editName: "Edit name",
      editMobileNumber: "Edit mobile number",
      cancelName: "Cancel name editing",
      cancelMobileNumber: "Cancel mobile number editing",
      close: "Close account settings",
      deleteAccount: "Delete account",
      confirmDelete: "Do you want to remove your account?",
      saveChanges: "SAVE CHANGES",
      deleteError: "Failed to delete account",
    },
    orderConfirmation: {
      confirmed: "ORDER CONFIRMED",
      unavailable: "ORDER UNAVAILABLE",
      details: "ORDER DETAILS",
      thankYou: "Thank you for shopping with W.EAR.",
      loading: "Loading your order…",
      checkLink: "Please check your link or return to the catalog.",
      pleaseWait: "Please wait while we retrieve your order.",
      status: "Order status",
      confirmedStatus: "Confirmed",
      deliveryMethod: "Delivery method",
      deliveryAddress: "Delivery address",
      paymentMethod: "Payment method",
      contactEmail: "Contact email",
      imageUnavailable: "Product image unavailable",
      noItems: "No order items available.",
      continueBrowsing: "Continue browsing",
      notFound:
        "This order could not be found for your account or guest session.",
      loadError: "We couldn't load your order. Please try again later.",
      detailsUnavailable:
        "The order details are unavailable. Please try again later.",
      invalidLink:
        "This link is missing a valid order number. Please check your confirmation link.",
      orderNumber: (id) => `Order #${String(id).padStart(6, "0")}`,
      branch: (number) => `Branch No. ${number}`,
      itemQuantity: (count) => `Qty: ${count}`,
    },
    sizeGuide: {
      title: "Size guide",
      intro:
        "Find the right size for a comfortable fit. Use the measurements below to choose your size.",
      categoryLabel: "Size chart category",
      tShirts: "T-shirts",
      hoodies: "Hoodies",
      jackets: "Jackets",
      pants: "Pants",
      unitLabel: "Measurement unit",
      cm: "cm",
      in: "in",
      centimetres: "centimetres",
      inches: "inches",
      size: "Size",
      chest: "Chest",
      shoulder: "Shoulder",
      length: "Length",
      sleeve: "Sleeve",
      waist: "Waist",
      hip: "Hip",
      inseam: "Inseam",
      note: "General sizing reference. Measurements are taken with garments laid flat; chest, waist and hip values are widths, not circumferences. Individual fits may vary — check the product details before choosing.",
      adviceLabel: "Measuring and fit advice",
      howToMeasure: "How to measure",
      betweenSizes: "In between sizes?",
      betweenSizesText:
        "If you’re between two sizes, consider the larger one for a more relaxed and comfortable fit.",
      compareText:
        "Compare the chart with a similar garment you already enjoy wearing. Think about the fit you prefer and leave room for any layers you plan to wear underneath.",
      chartTitle: (category) => `${category} size chart`,
      measurementsLabel: (category, unit) =>
        `${category} measurements in ${unit}`,
    },
    sizeGuideInstructions: {
      chest:
        "Lay a garment flat and measure across the chest, from one underarm to the other.",
      shoulder: "Measure from one shoulder seam to the other across the back.",
      length:
        "Measure from the highest point of the shoulder to the bottom hem.",
      sleeve: "Measure from the shoulder seam to the end of the sleeve.",
      waist:
        "Lay pants flat and measure straight across the waistband without stretching it.",
      hip: "With pants laid flat, measure across the widest part of the hip area.",
      pantsLength:
        "Measure from the top of the waistband to the bottom hem along the outside leg.",
      inseam:
        "Measure along the inside leg, from the crotch seam to the bottom hem.",
    },
    about: {
      eyebrow: "Our story",
      title: "About",
      everydayTitle: "Everyday clothing. A personal point of view.",
      detailsTitle: "Thoughtful choices, down to the details",
      comfortTitle: "Comfort that belongs in your routine",
      essentialsTitle: "More ways to wear the essentials",
      conclusionTitle: "Your everyday. Your style. W.EAR.",
      tagline: "Wear what feels right. Wear it your way.",
      exploreCollection: "Explore the collection",
      imageAlt:
        "Folded everyday essentials on a black chair in soft afternoon light",
      intro:
        "W.EAR is a modern clothing store built on a passion for style, quality and everyday comfort.",
      everydayIdea:
        "W.EAR starts with a simple idea: the clothes you wear most often deserve as much thought as the clothes you save for a special occasion. The T-shirt you put on before a slow morning, the jeans that follow you through a busy afternoon, the hoodie you take when the evening turns cool — these pieces become part of your routine. We see an everyday wardrobe as a collection of familiar favourites, each with a purpose and plenty of ways to wear it.",
      personalStyle:
        "Our approach to style leaves room for the person wearing the clothes. Clean shapes and understated colours give you a starting point, while the combinations are yours to discover. A relaxed layer can soften a more structured look. A simple top can bring balance to a favourite pair of jeans. You might dress the same piece differently from one day to the next, and that freedom is part of what makes a wardrobe feel like your own.",
      realLife:
        "We bring together T-shirts, jeans, pants, hoodies and outerwear with real life in mind. There is space for quiet mornings, days on the move and plans that happen at the last minute. Rather than prescribing a single look, W.EAR invites you to explore the details, consider the fit and choose the pieces that feel natural to you. Personal style grows through wearing, combining and returning to what you love.",
      favouriteDetails:
        "The pieces that become favourites often have a quiet presence. They are easy to reach for when there is little time to think, yet still feel considered when you have a whole morning to put an outfit together. A familiar neckline, a comfortable waistband or a sleeve that sits just where you like it can shape the way you feel throughout the day. That is the everyday perspective behind W.EAR: paying attention to clothing in the moments when it is actually worn, from leaving the house to coming home again.",
      dailyRoutine:
        "Your routine is a useful place to begin when thinking about personal style. Perhaps you spend most of the day moving between different places, or perhaps you need a few comfortable combinations for a more settled schedule. Some days call for layers that are easy to take off and carry; others call for a simple outfit that feels complete on its own. Looking at these small patterns can help you understand which pieces earn their place in your wardrobe and which details matter most to you.",
      familiarFoundation:
        "We like the possibilities that open up around a familiar foundation. Start with jeans and a plain T-shirt, then change the outer layer, the proportions or the way the sleeves are worn. A hoodie can give the combination a softer feeling, while a more structured jacket brings a different outline. Even small adjustments can change the character of an outfit. The starting pieces stay familiar, and the way you bring them together becomes an expression of your own taste.",
      colour:
        "Colour is another part of that conversation. You may feel most at home in a narrow range of shades, or enjoy bringing a different tone into an otherwise simple look. Notice the colours you already wear together and the ones that make getting dressed feel effortless. An everyday wardrobe does not need to follow a fixed formula. It can have a clear sense of continuity while leaving room for a favourite accent, an unexpected pairing or a piece you discover along the way.",
      changingStyle:
        "Personal style also changes with time. The shapes you enjoy this season may sit differently alongside the clothes you loved a year ago, and your daily needs may change as well. There is room to keep what feels familiar and explore what feels new. Returning to a piece after a while can reveal another way to wear it, especially when you combine it with a different layer or approach its proportions with fresh eyes. A wardrobe can develop gradually through these ordinary discoveries.",
      exploreAtYourPace:
        "W.EAR is a place to explore those choices at your own pace. Look through the collection with your existing favourites in mind, imagine the occasions that make up your week and consider the combinations you would enjoy repeating. The aim is a wardrobe that feels connected to the way you live. From a first layer to a finishing touch, each piece can contribute to something personal, practical and comfortable enough to become part of your everyday story.",
      wardrobeAsWhole:
        "A good wardrobe works as a whole. When you find something new, it helps to imagine how it will sit alongside the pieces you already reach for. Consider the shape of a sleeve, the length of a layer and the way a colour changes the mood of an outfit. These small decisions make getting dressed feel more intuitive. Our collection is an invitation to look closely and choose with your own habits, preferences and daily rhythm in mind.",
      comfortText:
        "Comfort is personal. For some, it means an easy silhouette and room to layer; for others, it is a more defined fit that feels familiar from the moment they put it on. Think about where and how you will wear a piece, whether you prefer extra room and what you want to wear underneath it. Product photos, descriptions and available measurements can help you understand each item before deciding what works for you. The best starting point is always the way you want to feel.",
      versatility:
        "Versatility comes from simple connections. A T-shirt works on its own or under an open shirt; denim can anchor a casual outfit or sit alongside a sharper outer layer. Neutral shades are easy to combine, while a different proportion or texture can make a familiar outfit feel fresh. Start with a few combinations you enjoy, then experiment with the balance of relaxed and structured pieces. There is no need to rebuild everything to find a new perspective on your everyday look.",
      careText:
        "Looking after what you own is part of that relationship, too. Follow the care instructions on each garment, choose washing and drying methods suited to its fabric and give your clothes the attention they need between wears. Getting to know a piece — how it fits, how it layers and how to care for it — helps it find a lasting place in your routine.",
      proportion:
        "Proportion is a useful detail to notice when building a combination. A wider trouser leg creates a different outline from a closer cut, and the length of a top can change how the whole outfit sits. Try thinking about the relationship between pieces rather than looking at each one in isolation. A shorter layer might reveal more of the shape underneath, while a longer outer layer can bring everything together. The balance that feels right depends on your preferences and how you like to move.",
      layering:
        "The same attention applies to layering. Begin with the piece closest to the body and consider how much space you want around it. A comfortable first layer can sit under a hoodie, an open shirt or a jacket, but each combination will have its own feel. Think about sleeve volume, necklines and the length of the hem. Giving those details a moment of thought can help you picture an outfit more clearly before choosing another piece to add to it.",
      texture:
        "Texture adds interest even when the colours stay close together. The appearance of denim beside a simple jersey top is different from the effect of a softer layer worn over both. Notice the surfaces, seams and finishing details shown in product images, and read the material information available for the item. These details help build a fuller picture of a garment. They also give you another way to make an understated outfit feel considered without adding more colours or accessories.",
      fitReference:
        "When considering fit, a favourite garment you already own can be a useful reference. Think about what you enjoy about it: the room through the shoulders, the position of the waist or the length that works with your other clothes. Compare available product measurements carefully and check how they are described. Your usual size is only one part of the decision, since different cuts can create different silhouettes. The goal is to understand the piece well enough to choose the feeling you want.",
      differentSettings:
        "An everyday wardrobe also moves between settings. A combination that works for a relaxed morning may need another layer for an evening outside, or a different balance for a day with more plans. Consider which pieces help you make those changes easily. An outer layer that works with several tops, or pants that sit comfortably alongside different silhouettes, can give you more options throughout the week. This is where thoughtful choices become useful in the small practical moments of getting dressed.",
      imagineOutfits:
        "Before adding something new, imagine a few complete outfits around it. You might picture it with your most familiar jeans, with a different pair of pants and under a layer you already enjoy. If those combinations feel natural, the piece may fit easily into your routine. If you are trying a shape that is new to you, consider starting with the colours and accessories you know best. Familiar surroundings can give you room to explore a different detail with confidence.",
      careHabits:
        "Care begins with understanding the garment in front of you. Check its label before washing, pay attention to any instructions about temperature or drying and consider whether it needs washing after every wear. Different materials and finishes have different needs, so a routine that suits one item may not suit another. Small habits such as storing clothes thoughtfully and checking them before putting them away can help keep your wardrobe organised and ready for the next time you wear it.",
      detailsTogether:
        "These details belong together: fit, proportion, texture, versatility and care all influence how clothing becomes part of daily life. You do not need to resolve every choice at once. Begin with the qualities you notice most, use the available product information and let your own experience guide what comes next. The more clearly you understand what makes a garment work for you, the easier it becomes to recognise pieces that will sit comfortably alongside the rest of your wardrobe.",
      brandPurpose:
        "At its heart, W.EAR is about making space for clothing that feels like you. Style, quality and comfort guide the way we think about everyday essentials, but it is your life that gives those pieces meaning. An outfit becomes personal through the places you take it, the things you do in it and the small choices that make it yours. We want our collection to be a useful starting point for that process.",
      exploreWardrobe:
        "Whether you are looking for one missing layer or taking a fresh look at your wardrobe, take your time and explore. Choose a fit you enjoy, a colour you return to and pieces you can imagine wearing in more than one way. Build on what already works, leave room to try something different and let your wardrobe evolve with you. Everyday clothing should feel easy to come back to.",
      dailyPossibilities:
        "The ideas that guide W.EAR come together in a simple daily experience: opening your wardrobe and finding possibilities that make sense to you. A comfortable foundation, a few familiar shapes and room for individual choices can make that moment feel more natural. Some mornings you may want to try a new combination; on others, you may return to an outfit you know well. Both are part of the same personal relationship with clothing, built through use and shaped by your own preferences.",
      wardrobeStory:
        "We see the collection as part of a wider wardrobe story. The clothes you already own, the pieces you have kept for years and the things you are still discovering all have a place in it. Something new can sit alongside those favourites and bring another possibility into view. It might complete a combination you have been imagining or simply become an easy option for ordinary days. Its value to you comes through the ways it fits into your life.",
      yourPace:
        "There is no single pace for building that wardrobe. You might know exactly which piece you are looking for, or prefer to browse and consider the details before deciding. Take time to imagine the fit, read the information provided and think about how the item connects to what you enjoy wearing. A choice can be small and still feel meaningful when it answers a real need, brings comfort to your routine or gives you a new way to wear something familiar.",
      styleFreedom:
        "The same freedom applies to how you put everything together. Repeat the outfits that feel good, revisit pieces you have overlooked and experiment when the mood arrives. Your style can stay understated, change with the seasons or develop around a few recognisable favourites. What matters is that it feels connected to you. The most useful inspiration often comes from noticing the clothes you reach for and understanding why you enjoy wearing them.",
      brandSpirit:
        "That is the spirit we want to carry through W.EAR: a thoughtful approach to everyday clothing, an appreciation for simple details and a belief in individual choice. From the first T-shirt in a combination to the layer you put on as you leave, there is space to create something that suits your day. Explore with curiosity, choose with your own routine in mind and let the way you wear each piece become the finishing detail.",
    },
    support: {
      label: "Customer support",
      title: "How can we help?",
      shoppingTitle: "Help with your shopping experience",
      choosingProducts:
        "Finding the right everyday pieces should feel simple. If you have a question about shopping at W.EAR, start with the information on the product page and the details in your cart. Product descriptions, available sizes, colours and photos can help you compare your options and decide which piece fits your wardrobe. Before choosing a size, consider the fit you prefer and any measurements provided for that item, especially if you plan to wear it over another layer.",
      reviewOrder:
        "When you are ready to order, review your selected items, sizes and quantities in the cart. Check your contact and delivery details before completing checkout so that the information attached to your order is accurate. If you are signed in, your account is a useful place to check the order information available to you. Keep your order confirmation handy whenever you need help with a particular purchase.",
      contactAdvice:
        "For questions about an item, include its name and the size or colour you are considering. For an existing order, have your order reference and a short description of the question ready. These details make it easier to understand what you need, whether you are checking a product, reviewing an order or asking about the next step. You can find the store’s contact information through the phone icon at the top of the page and in the Contacts section of the footer.",
      deliveryReturnsAdvice:
        "If your question concerns delivery, payment, a return or an exchange, describe your situation clearly and check the information associated with your order. Availability and the options that apply can depend on the item and the stage of your purchase. Contact the store to clarify the details before making arrangements or sending an item back.",
      browsingHelp:
        "If something does not look right while browsing, try refreshing the page and checking your internet connection. If a product is not appearing where you expected it, revisit the catalog and review any search terms or filters you have selected. Opening the product again can help you check its current details before adding it to the cart. Take a moment to confirm your chosen options whenever you change a size, colour or quantity.",
      signInHelp:
        "If you have trouble signing in, check that you are using the correct email address and the sign-in method associated with your account. Avoid sharing passwords, verification codes or full payment details when asking for assistance. A description of the issue and the page where it happened is usually a better starting point. If there is an error message, note its wording so you can explain exactly what you saw.",
      checkoutHelp:
        "If checkout appears to stop or you are unsure whether an order was completed, check for an order confirmation and review any order details available in your account before trying again. Make a note of what happened and contact the store if the status remains unclear. Include an order reference if you have one, along with the approximate time of the attempt, so the question can be connected to the right purchase.",
      feedback:
        "Your feedback also helps identify parts of the shopping experience that could be clearer. If a description leaves you with questions or a page is difficult to use, explain what you were trying to do and what happened instead. Mention whether you were using a phone, tablet or computer and which browser you used. Clear, practical details make it easier to understand the problem and help you find a way forward. Whatever brings you here, our aim is to make your next step easier to understand.",
    },
    deliveryPayment: {
      title: "Delivery & payment",
      delivery: "Delivery",
      postOffice: "Post office",
      homeDelivery: "Home delivery",
      deliveryTime: "Delivery time",
      deliveryTimeValue: "Depends on destination and carrier availability",
      cost: "Cost",
      costValue: "Shown in your order summary",
      payment: "Payment",
      cash: "Cash on delivery",
      onlinePayment: "Online payment",
      importantTitle: "Important information",
      supportLink: "Support page",
      importantItems: [
        "Review your chosen sizes, colours and quantities before placing an order.",
        "Check the recipient’s name, phone number and delivery destination carefully.",
        "Delivery timing depends on your region, carrier operations and the availability of the selected service.",
        "The delivery fee included in your purchase is displayed in the cart and checkout summary.",
        "Keep your order confirmation and reference handy when asking about a purchase.",
        "If tracking information is provided, use it to check your parcel’s progress with the carrier.",
        "For an address change or an unclear order status, contact support before placing a second order.",
      ],
      supportBefore: "If you have any questions, visit our ",
      supportAfter: " or use the contact details in the footer.",
      intro:
        "Find out how we deliver your order and which payment options are available. Choose the option that fits your day and review all order details before completing checkout.",
      postOfficeDescription:
        "Delivery to a Nova Poshta branch in Ukraine. Select post office delivery at checkout and enter your city and branch number so the destination is clear.",
      postOfficeAdvice:
        "Check the branch details and recipient information before placing your order. Choose a location that is convenient for you to visit and check its opening hours before collecting your parcel.",
      homeDescription:
        "Choose home delivery to have your order sent to your address. Enter your city and full street address, including the building and apartment number where applicable.",
      homeAdvice:
        "Use a phone number where you can be reached about the delivery. Review the address carefully, and contact support if you notice an error after placing your order so the available next steps can be checked.",
      cashDescription:
        "Select cash on delivery at checkout to choose payment upon receiving your order. Review the items, quantities and total before confirming your purchase.",
      cashAdvice:
        "Check the payment arrangements available at your selected branch or with the courier before collection. If you have questions about the amount or any applicable carrier fees, clarify them before accepting the parcel.",
      onlineDescription:
        "The checkout also includes a card payment option. Select your preferred payment method and review the order summary, including discounts and the delivery fee, before submitting your order.",
      demoWarning:
        "W.EAR is currently a demo store. Please do not enter real payment details or personal information. The card fields demonstrate the checkout experience; they do not represent a live payment service.",
    },
    returnsExchanges: {
      title: "Returns & exchanges",
      intro:
        "Not the right fit? No worries - you can return or exchange your item within 14 days.",
      termsLabel: "Return timeframe and condition",
      timeframe: "Timeframe",
      days: "14 days",
      condition: "Condition",
      conditionText:
        "The item must be unworn, unwashed, with all tags and original packaging.",
      howItWorks: "How it works",
      eligibleLabel: "Items eligible for return",
      acceptedTitle: "What can be returned",
      excludedTitle: "What can’t be returned",
      contactSupport: "Contact our support",
      contactSupportAfter:
        " to let us know you want to return or exchange an item. Have your order reference ready so we can help with the next steps.",
      steps: [
        {
          title: "Contact us",
          text: "Let us know you want to return or exchange an item. Have your order reference ready so we can help with the next steps.",
        },
        {
          title: "Send the item",
          text: "Pack the item securely and send it via Nova Poshta. Contact us to confirm the return destination before shipping your parcel.",
        },
        {
          title: "We check it",
          text: "After receiving the item, we’ll inspect its condition and check that the tags and original packaging are included.",
        },
        {
          title: "Get a refund or exchange",
          text: "Request a refund to your original payment method or an exchange for another size or item, subject to availability.",
        },
      ],
      accepted: [
        "Items in original condition",
        "With all tags attached",
        "In original packaging",
        "Within 14 days of receiving the order",
      ],
      excluded: [
        "Items with signs of use or washing",
        "Items without tags",
        "Underwear and socks",
        "Custom or personalized items",
      ],
    },
    privacyPolicy: {
      title: "Privacy Policy",
      informationTitle: "Information you provide",
      informationIntro:
        "The information involved depends on which features you choose to use:",
      usageTitle: "How the application uses information",
      storageTitle: "Cookies and browser storage",
      storageIntro: "The site also uses local storage in your browser for:",
      servicesTitle: "Storage and connected services",
      manageTitle: "Managing your information",
      privacyTitle: "Keeping your details private",
      updatesTitle: "Questions and updates",
      supportLink: "Support page",
      informationItems: [
        "Account registration uses an email address and password. The application stores a password hash rather than the original password.",
        "Your account profile can include a name, phone number and profile image if you choose to provide them.",
        "When Google sign-in is configured and you choose to use it, the application receives account information including your Google identifier, email address and display name.",
        "Your cart contains selected products, sizes, colours and quantities, associated with a guest identifier or a signed-in account.",
        "Checkout uses recipient and contact details, a delivery destination, your chosen payment method and the items included in your order.",
      ],
      storageItems: [
        "A guest identifier used to retrieve your guest cart.",
        "Cached sign-in state and the account email used by the interface.",
        "Your preference to dismiss the demo-store notice.",
      ],
      intro:
        "This page explains how information is used when you browse W.EAR, create an account or try the checkout. It describes the information involved in these features, the role of cookies and browser storage, and where to go if you have a question about your data.",
      demoWarning:
        "W.EAR is a demonstration store. Please use fictional details when trying account and checkout features, and do not submit real personal or payment information. Demo submissions can still be saved by the application; the demonstration label does not mean that everything disappears when you close your browser.",
      provideOnlyNeeded:
        "Provide only the information needed to try a feature. If you contact the store about an issue, avoid including passwords, sign-in codes or card information in your message. An order reference and a short description of the issue are a better starting point.",
      accountUsage:
        "Account information supports registration, sign-in and profile management. Session information helps the server recognise a signed-in visitor. Cart information lets the application retrieve your selected items and connect a guest cart to your account when you sign in.",
      checkoutUsage:
        "The checkout records order information so the application can show an order confirmation and order details. Selecting a payment method is part of the demo flow. It does not mean a real payment has been processed or that a parcel will be dispatched. Please do not enter real card details into the demonstration checkout.",
      sessionCookies:
        "W.EAR uses a session cookie to connect browser requests to a server-side session. The current application configures this cookie with a one-day lifetime. Session behaviour also depends on your browser settings and whether you sign out or clear cookies.",
      clearBrowserData:
        "Local storage can remain after you close a tab. You can remove it through your browser’s site-data settings. Clearing cookies or local storage may sign you out, reset the notice or disconnect the browser from a guest cart. Clearing browser data does not itself delete records already stored on the server.",
      backendStorage:
        "Account, cart, session and order features use the application’s backend and database. Requests to the site also pass through the infrastructure used to host it. Operational logs may contain request or session-related information used while maintaining and troubleshooting the application.",
      connectedServices:
        "Google sign-in, when enabled, involves a connection to Google. Review the information shown in the sign-in flow before continuing. A delivery carrier’s name or a payment option shown in this demo does not by itself mean your information has been sent to that service.",
      profileManagement:
        "You can review and edit the profile fields available in your account settings. The site also offers an account deletion action. Removing an account and clearing your browser’s site data are different actions: browser settings affect information on your device, while account deletion acts on the application’s account records.",
      retention:
        "Some information, such as order records or operational logs, may exist separately from your profile. This page does not promise that deleting an account immediately removes every related record or backup. For questions about stored information, corrections or deletion, use the contact options described on the Support page. Do not send sensitive information with your initial request.",
      protectDetails:
        "Use fictional information while exploring this demonstration. If you create a demo password, choose one you do not use elsewhere. Sign out after using a shared device and review saved browser data before leaving it for another person to use. No online application can offer an absolute guarantee against every security risk.",
      questions:
        "If you are unsure how a feature uses information, visit our Support page and use the contact options listed on the site. Explain which feature your question concerns so it can be understood without sharing unnecessary personal details.",
      updates:
        "This page should be updated when the site’s account, storage, checkout or connected-service features change. Before using a new feature, review the information shown alongside it and the current version of this page.",
    },
  },
  uk: {
    common: {
      home: "Головна",
      catalog: "Каталог",
      cart: "Кошик",
      account: "Обліковий запис",
      cancel: "Скасувати",
      close: "Закрити",
      delete: "Видалити",
      save: "Зберегти",
      loading: "Завантаження",
      tryAgain: "Спробувати ще раз",
      backHome: "На головну",
      continueShopping: "Продовжити покупки",
      seeProduct: "Переглянути товар",
      unavailable: "Недоступно",
      quantity: "Кількість",
      size: "Розмір",
      color: "Колір",
      orderSummary: "Підсумок замовлення",
      subtotal: "Сума товарів",
      discount: "Знижка",
      deliveryFee: "Вартість доставки",
      total: "Разом",
      email: "Електронна пошта",
      support: "Підтримка",
      genericError: "Щось пішло не так. Спробуйте ще раз.",
      discountWithPercent: (percent) => `Знижка (-${percent}%)`,
      rating: (rating) => `${rating} із 5 зірок`,
    },
    navbar: {
      catalog: "Каталог",
      spotlight: "У центрі уваги",
      searchTitle: "ЩО ШУКАЄТЕ?",
      search: "Пошук товарів",
      searchPlaceholder: "Шукайте джинси, худі та інше…",
      searchIcon: "Пошук",
      cart: "Кошик",
      account: "Обліковий запис",
      home: "Головна сторінка WEA.R",
      openMenu: "Відкрити меню навігації",
      closeMenu: "Закрити меню навігації",
      openContacts: "Відкрити контактну інформацію",
      cartWithCount: (count) => {
        const mod10 = count % 10;
        const mod100 = count % 100;
        const noun =
          mod10 === 1 && mod100 !== 11
            ? "товар"
            : mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14)
              ? "товари"
              : "товарів";
        return `Кошик, ${count} ${noun}`;
      },
    },
    categories: {
      pants: "Штани",
      hoodies: "Худі",
      jeans: "Джинси",
      "t-shirts": "Футболки",
      outerwear: "Верхній одяг",
    },
    sizes: {
      S: "Малий",
      M: "Середній",
      L: "Великий",
      XL: "Дуже великий",
      XXL: "Найбільший",
    },
    styles: {
      casual: "Повсякденний",
      formal: "Діловий",
      gym: "Спортивний",
      party: "Для вечірок",
    },
    footer: {
      description:
        "Простий одяг на щодень, що підкреслює ваш стиль і дарує комфорт.",
      catalog: "Каталог",
      services: "Інформація",
      about: "Про нас",
      support: "Підтримка",
      deliveryPayment: "Доставка й оплата",
      returnsExchanges: "Повернення й обмін",
      sizeGuide: "Таблиця розмірів",
      contacts: "Контакти",
      rights: "Усі права захищено.",
      privacyPolicy: "Політика конфіденційності",
    },
    contactMenu: {
      title: "Зв’яжіться з нами",
      close: "Закрити контактну інформацію",
      phoneNumbers: "Номери телефонів",
      workingHours: "Графік роботи",
      contactInformation: "Контактна інформація",
      socialNetworks: "Соціальні мережі",
      address: "вул. Фешн, 123, Львів",
      workHours: "Пн — Нд: 9:00 — 21:00",
    },
    app: {
      mainContent: "Основний вміст",
      accountDeleted: "Обліковий запис успішно видалено.",
      closeAccountDeleted:
        "Закрити повідомлення про видалення облікового запису",
      demoNotice:
        "Демонстраційний сайт — не використовуйте справжні персональні чи платіжні дані.",
      closeDemoNotice: "Закрити повідомлення про демонстраційний сайт",
    },
    home: {
      title: "Носіть те, що вам до душі",
      descriptionLine1: "Простий одяг на щодень.",
      descriptionLine2: "Створений для вашого стилю.",
      viewCollection: "Переглянути колекцію",
      statistics: "Статистика магазину",
      qualityLine1: "якісних",
      qualityLine2: "товарів",
      customersLine1: "задоволених",
      customersLine2: "покупців",
      heroImageAlt: "Модель у чорному худі на блискавці",
      collection: "Колекція",
      loadError: "Не вдалося завантажити товари. Спробуйте ще раз.",
      loadingCollection: "Завантаження колекції",
      comingSoon: "Незабаром з’являться нові товари.",
      viewAll: "Переглянути все",
      shopByCategory: "КУПУЙТЕ ЗА КАТЕГОРІЯМИ",
      storyTitle: "НАША ІСТОРІЯ",
      storyHeadingLine1: "ОДЯГ НА ЩОДЕНЬ.",
      storyHeadingLine2: "ВАШ ВЛАСНИЙ СТИЛЬ.",
      tagline: "Носіть по-своєму.",
      storyImageAlt: "Повсякденний одяг на вішаку",
      guideTitle: "Ласкаво просимо до інтернет-магазину W.EAR",
      whyShop: "Чому варто обрати W.EAR?",
      staplesIntro: "Знайдіть базові речі у нашому інтернет-магазині:",
      detailsTitle: "Деталі, що мають значення",
      detailsIntro: "Ось на що варто звернути увагу:",
      chooseTitle: "Як обрати нову улюблену річ на щодень",
      benefits: [
        "Якість. Акуратне оздоблення й тканини для повсякденного носіння.",
        "Універсальність. Прості речі, що поєднуються з вашим гардеробом.",
        "Стиль. Знайомі силуети, які можна обіграти по-своєму.",
        "Практичність. Базові речі для різних сезонів і нагод.",
        "Комфорт. Крій, що дозволяє вільно рухатися протягом дня.",
      ],
      staples: [
        "Футболки — проста основа для повсякденних і багатошарових образів.",
        "Джинси — базова річ для ошатних або невимушених поєднань.",
        "Худі — зручний одяг для спокійних днів.",
        "Верхній одяг — завершальний штрих, коли стає прохолодно.",
      ],
      detailsList: [
        "Тканина — обирайте матеріал відповідно до погоди й вашого способу життя.",
        "Крій — порівняйте вільні, прямі та приталені моделі, щоб знайти свій варіант.",
        "Багатошаровість — залиште достатньо місця для поєднання улюблених речей.",
        "Деталі — звертайте увагу на кишені, застібки, манжети й шви.",
        "Догляд — дотримуйтеся вказівок на етикетці, щоб зберегти гарний вигляд речі.",
      ],
      storyIntro:
        "W.EAR об’єднує повсякденні речі навколо простої ідеї: одягатися має бути легко й природно. Знайомі силуети, стримані кольори та свобода створювати власні образи.",
      storyEveryday:
        "Від джинсів, які ви обираєте щоранку, до верхнього шару, який берете всюди, — нас надихає одяг, що вписується у ваше життя. Його легко поєднувати, зручно носити й щоразу можна обіграти по-новому.",
      guideIntro:
        "Відкрийте для себе повсякденний одяг, що відповідає вашому способу життя та стилю. Перегляньте колекцію джинсів, футболок, худі й верхнього одягу та створіть гардероб, який носитимете із задоволенням.",
      benefitsIntro:
        "Вдалий образ починається з речей, у яких вам добре. Обираючи нову базову річ, звертайте увагу на:",
      findFavourite:
        "Перегляньте колекцію, щоб знайти нову улюблену річ або створити образ на основі базових моделей. Кілька вдало підібраних речей відкривають безліч можливостей.",
      detailsText:
        "Вдалий одяг поєднує гарний вигляд і комфорт. Перед вибором перегляньте опис і фотографії товару, щоб дізнатися більше про тканину, крій та оздоблення.",
      chooseOccasion:
        "Почніть із того, як ви носитимете річ. Для насиченого дня, спокійних вихідних чи зміни сезону обирайте одяг, що відповідає вашим планам і в якому вам природно й зручно.",
      chooseFilters:
        "Скористайтеся категоріями та фільтрами каталогу, щоб звузити пошук. Уважніше розгляньте фотографії й доступні розміри та подумайте, як кожна річ поєднуватиметься з вашим гардеробом.",
      chooseFit:
        "Врахуйте й бажану посадку. Залиште місце для вільного руху та одягу, який плануєте носити під цією річчю. Обирайте улюблені кольори й силуети та створюйте власний образ.",
      shopCategory: (category) => `Переглянути категорію «${category}»`,
    },
    homeCollection: {
      products: "Товари колекції",
      chooseSlide: "Вибрати слайд колекції",
      pause: "Призупинити слайд-шоу",
      resume: "Відновити слайд-шоу",
      slidePosition: (current, total) => `${current} із ${total}`,
      goToProduct: (number) => `Перейти до товару ${number}`,
    },
    catalog: {
      title: "КАТАЛОГ",
      loadErrorTitle: "Не вдалося завантажити товари",
      loadError: "Не вдалося завантажити товари. Спробуйте пізніше.",
      filters: "Фільтри",
      closeFilters: "Закрити фільтри",
      filterRegion: "Фільтри каталогу",
      sortBy: "Сортувати за:",
      sortLabel: "Сортування",
      price: "Ціна",
      size: "Розмір",
      dressStyle: "Стиль одягу",
      applyFilter: "Застосувати фільтр",
      resetFilter: "Скинути фільтр",
      emptyTitle: "Товарів не знайдено",
      emptyText: "Змініть фільтри, щоб побачити більше товарів.",
      showingItems: (start, end, total) =>
        `показано ${start}–${end} із ${total} товарів`,
    },
    sortOptions: {
      popular: "За популярністю",
      priceDescending: "Від дорожчих до дешевших",
      priceAscending: "Від дешевших до дорожчих",
    },
    pagination: {
      label: "Сторінки каталогу",
      previous: "Назад",
      next: "Далі",
      first: "Перша сторінка",
      last: "Остання сторінка",
      more: "Інші сторінки",
    },
    search: {
      filterRegion: "Фільтри пошуку",
      empty: "Товарів не знайдено.",
      resultsFor: (query) => `Результати пошуку «${query}»`,
    },
    product: {
      added: "Додано до кошика.",
      closeAdded: "Закрити повідомлення кошика",
      loadError: "Не вдалося завантажити товар.",
      selectColor: "Виберіть колір",
      selectSize: "Виберіть розмір",
      outOfStock: "Товару вибраного розміру й кольору зараз немає в наявності.",
      decreaseQuantity: "Зменшити кількість",
      increaseQuantity: "Збільшити кількість",
      maxQuantity:
        "Ви вибрали максимальну доступну кількість для цього розміру.",
      adding: "ДОДАВАННЯ",
      addToCart: "ДОДАТИ ДО КОШИКА",
      chooseVariant: "Виберіть колір і розмір, перш ніж додати товар.",
      addError: "Не вдалося додати товар до кошика. Спробуйте ще раз.",
      details: "Інформація про товар",
      detailsCare: "Деталі й догляд",
      features: "Особливості товару",
      material: "Матеріал",
      fit: "Крій",
      gender: "Стать",
      season: "Сезон",
      madeIn: "Країна виробництва",
      care: "Догляд",
      keepBrowsing: "Продовжити перегляд",
      goToCart: "Перейти до кошика",
      frontImageAlt: (name) => `${name}: вигляд спереду`,
      backImageAlt: (name) => `${name}: вигляд ззаду`,
    },
    cart: {
      title: "Ваш кошик",
      size: "Розмір:",
      color: "Колір:",
      noMoreStock: "Більше немає в наявності",
      clear: "Очистити кошик",
      empty: "Ваш кошик порожній",
      emptyText: "Схоже, ви ще нічого не додали до кошика.",
      checkout: "Перейти до оформлення",
      information: "Інформація для покупців",
      deliveryTitle: "Доставка",
      beforeOrderTitle: "Перед замовленням",
      helpTitle: "Потрібна допомога?",
      recommendations: "Вам також може сподобатися",
      recommendationsText: "Ще кілька речей, які можуть вам сподобатися.",
      viewAllProducts: "Переглянути всі товари",
      deliveryText:
        "Оберіть спосіб доставки й заповніть дані під час оформлення. Уважно перевірте адресу та контактний номер, щоб замовлення дісталося до вас. Перед підтвердженням перегляньте вартість доставки в підсумку замовлення.",
      beforeOrderText:
        "Перед оформленням ще раз перевірте вибрані розміри, кольори й кількості. У кошику можна змінити кількість або видалити товари. Якщо вагаєтеся щодо речі, поверніться на її сторінку й перегляньте фотографії та опис.",
      helpText:
        "Маєте запитання про товар або замовлення? Скористайтеся контактами внизу сторінки. Вкажіть назву товару або номер уже оформленого замовлення, щоб ми могли краще зрозуміти ваше запитання.",
    },
    checkout: {
      title: "ОФОРМЛЕННЯ ЗАМОВЛЕННЯ",
      intro: "Заповніть дані для оформлення замовлення.",
      contactDetails: "КОНТАКТНІ ДАНІ",
      emailPlaceholder: "you@example.com",
      phoneOptional: "Номер телефону (необов’язково)",
      phonePlaceholder: "+380 67 123 45 67",
      delivery: "ДОСТАВКА",
      deliveryMethod: "Спосіб доставки",
      postOffice: "До відділення",
      homeDelivery: "Кур’єрська доставка",
      city: "Місто",
      cityPlaceholder: "Введіть місто",
      branchNumber: "Номер відділення",
      branchPlaceholder: "Наприклад, 12",
      homeAddress: "Адреса доставки",
      addressPlaceholder: "Вулиця, будинок, квартира",
      payment: "ОПЛАТА",
      paymentMethod: "Спосіб оплати",
      cash: "Оплата при отриманні",
      card: "Карткою",
      cardNumber: "Номер картки",
      cardNumberPlaceholder: "1234 5678 9012 3456",
      cardholderName: "Ім’я власника картки",
      cardholderPlaceholder: "Ім’я, як на картці",
      expiration: "Термін дії",
      expirationPlaceholder: "ММ/РР",
      cvv: "CVV",
      cvvPlaceholder: "123",
      placeOrder: "Оформити замовлення",
      continueShopping: "Продовжити покупки",
      addressHint:
        "Введіть вулицю й будинок, за потреби — квартиру (не більше 3 слів).",
      itemQuantity: (count) => `×${count}`,
    },
    checkoutErrors: {
      emailRequired: "Введіть електронну пошту",
      emailInvalid: "Введіть коректну адресу електронної пошти",
      phoneInvalid: "Введіть коректний номер телефону",
      cityRequired: "Введіть місто",
      cityInvalid: "Введіть коректну назву міста",
      branchRequired: "Введіть номер відділення",
      branchInvalid: "Введіть коректний номер відділення",
      addressRequired: "Введіть адресу доставки",
      addressInvalid: "Введіть коректну адресу доставки",
      cardNumberRequired: "Введіть номер картки",
      cardNumberInvalid: "Введіть коректний номер картки",
      cardholderRequired: "Введіть ім’я власника картки",
      cardholderInvalid: "Введіть коректне ім’я власника картки",
      expirationRequired: "Введіть термін дії",
      expirationInvalid: "Некоректний термін дії",
      cvvRequired: "Введіть CVV",
      cvvInvalid: "Введіть коректний CVV",
      requiredFields:
        "Заповніть усі обов’язкові поля перед оформленням замовлення.",
      loadCart: "Не вдалося завантажити кошик",
    },
    auth: {
      createAccount: "Створити обліковий запис",
      logIn: "Увійти",
      register: "Зареєструватися",
      email: "Електронна пошта",
      password: "Пароль",
      emailPlaceholder: "Введіть електронну пошту",
      createPasswordPlaceholder: "Створіть пароль (8–128 символів)",
      passwordPlaceholder: "Введіть пароль",
      hidePassword: "Приховати пароль",
      showPassword: "Показати пароль",
      emailEmpty: "Введіть електронну пошту.",
      emailInvalid: "Введіть коректну адресу електронної пошти.",
      passwordEmpty: "Введіть пароль.",
      passwordLength: "Пароль має містити від 8 до 128 символів",
      sending: "Надсилання",
      googleRedirect: "Перехід до Google…",
      googleContinue: "Продовжити з Google",
      hasAccount: "Уже маєте обліковий запис?",
      noAccount: "Ще не маєте облікового запису?",
      signInFailed: "Не вдалося увійти",
      accountExists:
        "Обліковий запис із цією адресою вже існує. Скористайтеся своїм звичним способом входу.",
      googleUnavailable:
        "Вхід через Google ще не налаштовано. Скористайтеся електронною поштою та паролем.",
      googleFailed:
        "Не вдалося увійти через Google. Спробуйте ще раз або скористайтеся електронною поштою та паролем.",
      googleStartError: "Не вдалося розпочати вхід через Google",
      backToAuth: "Повернутися до входу / реєстрації",
    },
    account: {
      signedInAs: "ВИ УВІЙШЛИ ЯК",
      orders: "Мої замовлення",
      ordersDescription: "Переглянути історію та статус замовлень",
      cart: "Мій кошик",
      cartDescription: "Повернутися до кошика",
      settings: "Налаштування облікового запису",
      settingsDescription: "Змінити дані облікового запису",
      logOut: "Вийти",
    },
    accountSettings: {
      title: "Налаштування облікового запису",
      profile: "Профіль",
      yourName: "Ваше ім’я",
      namePlaceholder: "ваше ім’я",
      name: "Ім’я",
      mobileNumber: "Мобільний номер",
      addNumber: "Додати номер",
      editName: "Змінити ім’я",
      editMobileNumber: "Змінити мобільний номер",
      cancelName: "Скасувати редагування імені",
      cancelMobileNumber: "Скасувати редагування номера",
      close: "Закрити налаштування облікового запису",
      deleteAccount: "Видалити обліковий запис",
      confirmDelete: "Ви хочете видалити свій обліковий запис?",
      saveChanges: "ЗБЕРЕГТИ ЗМІНИ",
      deleteError: "Не вдалося видалити обліковий запис",
    },
    orderConfirmation: {
      confirmed: "ЗАМОВЛЕННЯ ПІДТВЕРДЖЕНО",
      unavailable: "ЗАМОВЛЕННЯ НЕДОСТУПНЕ",
      details: "ДЕТАЛІ ЗАМОВЛЕННЯ",
      thankYou: "Дякуємо за покупку в W.EAR.",
      loading: "Завантаження замовлення…",
      checkLink: "Перевірте посилання або поверніться до каталогу.",
      pleaseWait: "Зачекайте, поки завантажиться замовлення.",
      status: "Статус замовлення",
      confirmedStatus: "Підтверджено",
      deliveryMethod: "Спосіб доставки",
      deliveryAddress: "Адреса доставки",
      paymentMethod: "Спосіб оплати",
      contactEmail: "Контактна електронна пошта",
      imageUnavailable: "Зображення товару недоступне",
      noItems: "Інформація про товари в замовленні відсутня.",
      continueBrowsing: "Продовжити перегляд",
      notFound:
        "Не вдалося знайти це замовлення для вашого облікового запису або гостьового сеансу.",
      loadError: "Не вдалося завантажити замовлення. Спробуйте пізніше.",
      detailsUnavailable: "Деталі замовлення недоступні. Спробуйте пізніше.",
      invalidLink:
        "У посиланні немає коректного номера замовлення. Перевірте посилання з підтвердження.",
      orderNumber: (id) => `Замовлення №${String(id).padStart(6, "0")}`,
      branch: (number) => `Відділення №${number}`,
      itemQuantity: (count) => `Кількість: ${count}`,
    },
    sizeGuide: {
      title: "Таблиця розмірів",
      intro:
        "Знайдіть свій розмір для комфортної посадки. Скористайтеся наведеними нижче вимірами.",
      categoryLabel: "Категорія таблиці розмірів",
      tShirts: "Футболки",
      hoodies: "Худі",
      jackets: "Куртки",
      pants: "Штани",
      unitLabel: "Одиниця вимірювання",
      cm: "см",
      in: "дюйми",
      centimetres: "сантиметрах",
      inches: "дюймах",
      size: "Розмір",
      chest: "Груди",
      shoulder: "Плечі",
      length: "Довжина",
      sleeve: "Рукав",
      waist: "Талія",
      hip: "Стегна",
      inseam: "Внутрішній шов",
      note: "Загальний орієнтир для вибору розміру. Виміри знято з одягу, розкладеного на рівній поверхні; значення для грудей, талії та стегон — це ширина, а не обхват. Посадка окремих моделей може відрізнятися — перед вибором перегляньте інформацію про товар.",
      adviceLabel: "Поради щодо вимірювання й посадки",
      howToMeasure: "Як зняти виміри",
      betweenSizes: "Вагаєтеся між розмірами?",
      betweenSizesText:
        "Якщо ваші виміри між двома розмірами, оберіть більший для вільнішої та комфортнішої посадки.",
      compareText:
        "Порівняйте таблицю з вимірами схожої улюбленої речі. Врахуйте бажану посадку й залиште місце для одягу, який носитимете під нею.",
      chartTitle: (category) => `Таблиця розмірів: ${category}`,
      measurementsLabel: (category, unit) => `${category}: виміри в ${unit}`,
    },
    sizeGuideInstructions: {
      chest:
        "Розкладіть річ на рівній поверхні й виміряйте ширину на рівні грудей від однієї пахви до іншої.",
      shoulder: "Виміряйте відстань між плечовими швами по спинці.",
      length: "Виміряйте довжину від найвищої точки плеча до нижнього краю.",
      sleeve: "Виміряйте довжину від плечового шва до краю рукава.",
      waist:
        "Розкладіть штани на рівній поверхні й виміряйте ширину пояса, не розтягуючи його.",
      hip: "Розкладіть штани на рівній поверхні й виміряйте ширину в найширшому місці на рівні стегон.",
      pantsLength:
        "Виміряйте довжину від верхнього краю пояса до низу штанини вздовж зовнішнього шва.",
      inseam:
        "Виміряйте довжину внутрішнього шва від крокового шва до низу штанини.",
    },
    about: {
      eyebrow: "Наша історія",
      title: "Про",
      everydayTitle: "Повсякденний одяг. Особистий погляд.",
      detailsTitle: "Продуманий вибір до найменших деталей",
      comfortTitle: "Комфорт на щодень",
      essentialsTitle: "Більше способів носити базові речі",
      conclusionTitle: "Ваші будні. Ваш стиль. W.EAR.",
      tagline: "Носіть те, що вам до душі. Носіть по-своєму.",
      exploreCollection: "Переглянути колекцію",
      imageAlt:
        "Складені базові речі на чорному стільці в м’якому післяобідньому світлі",
      intro:
        "W.EAR — сучасний магазин одягу, створений із любові до стилю, якості та щоденного комфорту.",
      everydayIdea:
        "W.EAR починається з простої ідеї: одяг, який ви носите найчастіше, заслуговує не меншої уваги, ніж речі для особливих нагод. Футболка для неквапливого ранку, джинси для насиченого дня, худі для прохолодного вечора — усе це стає частиною вашого життя. Для нас повсякденний гардероб — це набір знайомих улюблених речей, кожна з яких має своє призначення й безліч способів носіння.",
      personalStyle:
        "Наш підхід до стилю залишає простір для вашої індивідуальності. Лаконічні форми та стримані кольори дають основу, а поєднання ви знаходите самі. Вільний верх може пом’якшити строгіший образ. Простий топ — урівноважити улюблені джинси. Одну й ту саму річ можна щодня носити по-іншому, і саме ця свобода робить гардероб вашим.",
      realLife:
        "Ми об’єднуємо футболки, джинси, штани, худі й верхній одяг із думкою про справжнє життя. Тут є місце для тихих ранків, активних днів і спонтанних планів. W.EAR не нав’язує єдиний образ, а запрошує придивитися до деталей, оцінити крій і вибрати речі, у яких вам природно. Власний стиль формується, коли ви носите, поєднуєте й знову повертаєтеся до улюбленого.",
      favouriteDetails:
        "Улюблені речі часто не привертають зайвої уваги. Їх легко обрати, коли немає часу роздумувати, і вони залишаються доречними, коли є цілий ранок на створення образу. Звичний виріз, зручний пояс або рукав потрібної довжини можуть впливати на самопочуття протягом дня. Саме так W.EAR дивиться на повсякденний одяг: уважно до тих моментів, коли його справді носять, — від виходу з дому до повернення.",
      dailyRoutine:
        "Роздуми про власний стиль варто починати зі свого розпорядку. Можливо, більшість дня ви пересуваєтеся між різними місцями, а можливо, вам потрібні зручні поєднання для спокійнішого ритму. Іноді потрібен одяг, який легко зняти й нести із собою, а іноді — простий завершений образ. Спостереження за такими звичками допомагає зрозуміти, які речі справді потрібні у вашому гардеробі та які деталі для вас найважливіші.",
      familiarFoundation:
        "Нам подобаються можливості, які відкриває знайома основа. Почніть із джинсів і однотонної футболки, потім змініть верхній шар, пропорції або спосіб підгорнути рукави. Худі зробить поєднання м’якшим, а куртка чіткішого крою створить інший силует. Навіть невеликі зміни впливають на характер образу. Базові речі залишаються знайомими, а їх поєднання виражає ваш смак.",
      colour:
        "Колір — ще одна частина власного стилю. Можливо, вам найкомфортніше в кількох звичних відтінках, або ж подобається додавати новий тон до простого образу. Звертайте увагу на кольори, які вже поєднуєте, і на ті, з якими одягатися легко. Повсякденний гардероб не потребує жорсткої формули. Він може залишатися цілісним і водночас мати місце для улюбленого акценту, несподіваного поєднання чи нової знахідки.",
      changingStyle:
        "З часом особистий стиль теж змінюється. Силуети, які подобаються цього сезону, можуть інакше поєднуватися з торішніми улюбленими речами, а щоденні потреби — змінюватися. Можна зберігати звичне й пробувати нове. Повернувшись до речі після перерви, ви можете знайти інший спосіб її носити, особливо в новому поєднанні або зі свіжим поглядом на пропорції. Такі звичайні відкриття поступово розвивають гардероб.",
      exploreAtYourPace:
        "W.EAR — місце, де можна досліджувати ці можливості у власному темпі. Переглядаючи колекцію, думайте про свої улюблені речі, події протягом тижня та поєднання, які захочеться повторювати. Мета — гардероб, пов’язаний із вашим способом життя. Від першого шару до завершальної деталі кожна річ може стати частиною особистого, практичного й зручного образу на щодень.",
      wardrobeAsWhole:
        "Вдалий гардероб працює як єдине ціле. Знайшовши щось нове, уявіть, як воно поєднається з речами, які ви вже любите. Зважайте на форму рукава, довжину верху й те, як колір змінює настрій образу. Такі невеликі рішення роблять вибір одягу інтуїтивнішим. Наша колекція запрошує придивлятися й обирати з урахуванням власних звичок, уподобань і щоденного ритму.",
      comfortText:
        "Комфорт для кожного свій. Для одних це вільний силует і місце для кількох шарів, для інших — чіткіша посадка, у якій одразу почуваєшся добре. Подумайте, де й як носитимете річ, чи потрібен запас простору та що буде під нею. Фотографії, описи й виміри допоможуть краще зрозуміти товар перед вибором. Починайте з того, як ви хочете почуватися.",
      versatility:
        "Універсальність виникає з простих поєднань. Футболку можна носити окремо або під розстібнутою сорочкою; джинси можуть стати основою невимушеного образу чи поєднуватися зі строгішим верхом. Нейтральні відтінки легко комбінувати, а нові пропорції або фактура освіжають знайомий образ. Почніть із кількох улюблених поєднань, а потім експериментуйте з балансом вільних і чітких форм. Щоб по-новому поглянути на щоденний стиль, не обов’язково змінювати весь гардероб.",
      careText:
        "Догляд за одягом теж важливий. Дотримуйтеся вказівок на етикетці кожної речі, обирайте прання й сушіння відповідно до тканини та доглядайте за нею між носіннями. Коли ви знаєте, як річ сидить, із чим поєднується й як її доглядати, їй легше надовго залишитися частиною вашого гардероба.",
      proportion:
        "Створюючи поєднання, звертайте увагу на пропорції. Широка штанина створює інший силует, ніж вузька, а довжина верху може змінити вигляд усього образу. Думайте про співвідношення речей, а не лише про кожну окремо. Коротший верх може відкрити більше нижнього шару, а довший — об’єднати образ. Правильний баланс залежить від ваших уподобань і того, як вам зручно рухатися.",
      layering:
        "Так само уважно варто ставитися до багатошаровості. Почніть із речі, найближчої до тіла, і подумайте, скільки простору вам потрібно. Зручний базовий шар можна носити під худі, розстібнутою сорочкою чи курткою, але кожне поєднання відчуватиметься інакше. Враховуйте об’єм рукавів, вирізи й довжину краю. Це допоможе чіткіше уявити образ перед додаванням нової речі.",
      texture:
        "Фактура робить образ цікавішим навіть у близьких кольорах. Джинсова тканина поруч із простим трикотажним топом виглядає інакше, ніж у поєднанні з м’яким верхнім шаром. Розглядайте поверхню тканини, шви й оздоблення на фотографіях та читайте інформацію про матеріал. Так ви краще зрозумієте річ і зможете зробити стриманий образ виразнішим без додаткових кольорів чи аксесуарів.",
      fitReference:
        "Обираючи посадку, орієнтуйтеся на улюблену річ, яка вже є у вашому гардеробі. Подумайте, що саме вам у ній подобається: простір у плечах, положення талії чи довжина, яка пасує до іншого одягу. Уважно порівнюйте доступні виміри та спосіб їх опису. Звичний розмір — лише частина вибору, адже різний крій створює різні силуети. Важливо достатньо зрозуміти річ, щоб обрати бажаний комфорт.",
      differentSettings:
        "Повсякденний гардероб має підходити для різних ситуацій. До образу для спокійного ранку може знадобитися додатковий шар увечері надворі або інший баланс для насиченого дня. Подумайте, які речі дозволяють легко змінюватися. Верх, що поєднується з кількома топами, або штани, які пасують до різних силуетів, дають більше варіантів протягом тижня. Саме в таких щоденних моментах продуманий вибір стає корисним.",
      imagineOutfits:
        "Перед покупкою нової речі уявіть із нею кілька завершених образів: зі звичними джинсами, іншими штанами чи улюбленим верхом. Якщо ці поєднання здаються природними, річ легко впишеться у ваше життя. Якщо пробуєте новий для себе силует, почніть зі знайомих кольорів і аксесуарів. Звичне оточення допоможе впевненіше спробувати нову деталь.",
      careHabits:
        "Догляд починається з розуміння конкретної речі. Перед пранням перевірте етикетку, зверніть увагу на температуру й сушіння та подумайте, чи потрібне прання після кожного носіння. Різні матеріали й види оздоблення потребують різного догляду, тому звичний спосіб підходить не всім речам. Акуратне зберігання й огляд перед тим, як прибрати одяг, допомагають тримати гардероб упорядкованим і готовим до наступного використання.",
      detailsTogether:
        "Усі ці деталі пов’язані: посадка, пропорції, фактура, універсальність і догляд впливають на те, як одяг стає частиною життя. Не потрібно визначати все одразу. Почніть із найважливіших для вас якостей, скористайтеся інформацією про товар і спирайтеся на власний досвід. Що краще ви розумієте, чому річ вам підходить, то легше знаходити нові вдалі доповнення до гардероба.",
      brandPurpose:
        "В основі W.EAR — бажання залишити місце для одягу, в якому ви впізнаєте себе. Стиль, якість і комфорт визначають наш підхід до базових речей, але саме ваше життя надає їм сенсу. Образ стає особистим завдяки місцям, де ви буваєте, справам, якими займаєтеся, і невеликим власним рішенням. Ми хочемо, щоб наша колекція стала корисною основою для цього.",
      exploreWardrobe:
        "Шукаєте потрібний верхній шар чи хочете по-новому поглянути на гардероб — не поспішайте й придивляйтеся. Обирайте зручну посадку, улюблений колір і речі, які уявляєте в кількох поєднаннях. Спирайтеся на те, що вже працює, залишайте місце для нового та дозволяйте гардеробу змінюватися разом із вами. До повсякденного одягу має хотітися повертатися.",
      dailyPossibilities:
        "Ідеї W.EAR поєднуються у звичайному щоденному моменті: ви відкриваєте гардероб і бачите варіанти, що вам підходять. Зручна основа, знайомі силуети й свобода власного вибору роблять цей момент природнішим. Одного ранку хочеться нового поєднання, іншого — добре знайомого образу. Обидва варіанти є частиною особистих стосунків з одягом, які формуються через досвід і власні вподобання.",
      wardrobeStory:
        "Ми бачимо колекцію як частину більшої історії вашого гардероба. У ній є місце для одягу, який ви вже маєте, для речей, що зберігаєте роками, і для нових знахідок. Нова річ може доповнити улюблене й відкрити ще одну можливість: завершити давно задуманий образ або просто стати зручним вибором на щодень. Її цінність для вас визначається тим, як вона вписується у ваше життя.",
      yourPace:
        "У створенні гардероба немає єдиного темпу. Можливо, ви точно знаєте, що шукаєте, а можливо, хочете спершу переглянути варіанти й деталі. Знайдіть час уявити посадку, прочитати опис і подумати, як річ поєднається з улюбленим одягом. Навіть невеликий вибір має значення, якщо відповідає справжній потребі, додає комфорту або відкриває новий спосіб носити знайоме.",
      styleFreedom:
        "Така сама свобода є і в поєднанні речей. Повторюйте образи, в яких вам добре, повертайтеся до забутих речей і експериментуйте за настроєм. Ваш стиль може залишатися стриманим, змінюватися із сезонами чи розвиватися навколо кількох упізнаваних улюблених моделей. Важливо, щоб він відчувався вашим. Найкраще натхнення часто приходить, коли помічаєш, що обираєш найчастіше, і розумієш чому.",
      brandSpirit:
        "Саме цей підхід ми хочемо втілити у W.EAR: увагу до повсякденного одягу, цінність простих деталей і свободу особистого вибору. Від першої футболки в образі до верху, який ви надягаєте перед виходом, — є простір створити щось відповідне вашому дню. Досліджуйте, зважайте на власний ритм і нехай спосіб носити кожну річ стане завершальним штрихом.",
    },
    support: {
      label: "Підтримка покупців",
      title: "Чим можемо допомогти?",
      shoppingTitle: "Допомога з покупками",
      choosingProducts:
        "Обирати повсякденний одяг має бути просто. Якщо маєте запитання про покупки в W.EAR, почніть з інформації на сторінці товару та в кошику. Описи, доступні розміри, кольори й фотографії допоможуть порівняти варіанти та визначити, що підійде до вашого гардероба. Перед вибором розміру врахуйте бажану посадку й наведені виміри, особливо якщо плануєте носити річ поверх іншого одягу.",
      reviewOrder:
        "Коли будете готові замовити, перевірте товари, розміри й кількості в кошику. Перед завершенням оформлення перевірте контактні дані й дані доставки, щоб замовлення містило правильну інформацію. Якщо ви увійшли в обліковий запис, перегляньте доступні там відомості про замовлення. Збережіть підтвердження замовлення на випадок звернення щодо покупки.",
      contactAdvice:
        "Якщо запитуєте про товар, вкажіть його назву та розмір або колір, який вас цікавить. Для запитань щодо оформленого замовлення підготуйте його номер і короткий опис питання. Так буде легше зрозуміти, яка допомога потрібна: з вибором товару, перевіркою замовлення чи подальшими діями. Контакти магазину доступні через значок телефону вгорі сторінки та в розділі «Контакти» внизу.",
      deliveryReturnsAdvice:
        "Якщо запитання стосується доставки, оплати, повернення чи обміну, чітко опишіть ситуацію та перевірте інформацію про замовлення. Доступні варіанти можуть залежати від товару й етапу покупки. Зв’яжіться з магазином, щоб уточнити деталі, перш ніж домовлятися про повернення або надсилати товар.",
      browsingHelp:
        "Якщо під час перегляду щось працює неправильно, оновіть сторінку й перевірте з’єднання з інтернетом. Якщо не бачите очікуваного товару, поверніться до каталогу та перевірте пошуковий запит і фільтри. Повторно відкрийте сторінку товару, щоб уточнити актуальні дані перед додаванням до кошика. Перевіряйте вибрані параметри щоразу, коли змінюєте розмір, колір або кількість.",
      signInHelp:
        "Якщо не вдається увійти, перевірте електронну пошту та спосіб входу, пов’язаний з вашим обліковим записом. Звертаючись по допомогу, не надсилайте паролі, коди підтвердження чи повні платіжні дані. Почніть з опису проблеми та сторінки, де вона виникла. Якщо з’явилося повідомлення про помилку, збережіть його текст, щоб точно пояснити, що ви побачили.",
      checkoutHelp:
        "Якщо оформлення зупинилося або ви не впевнені, чи створено замовлення, перед повторною спробою перевірте наявність підтвердження й доступні дані в обліковому записі. Запишіть, що сталося, та зверніться до магазину, якщо статус залишається незрозумілим. Вкажіть номер замовлення, якщо він є, і приблизний час спроби, щоб ми могли знайти потрібну покупку.",
      feedback:
        "Ваші відгуки допомагають зрозуміти, що можна зробити зручнішим. Якщо опис викликає запитання або сторінкою складно користуватися, розкажіть, що ви намагалися зробити та що сталося натомість. Вкажіть пристрій — телефон, планшет чи комп’ютер — і браузер. Конкретні деталі допоможуть зрозуміти проблему й знайти рішення. Ми прагнемо зробити ваш наступний крок зрозумілішим.",
    },
    deliveryPayment: {
      title: "Доставка й оплата",
      delivery: "Доставка",
      postOffice: "До відділення",
      homeDelivery: "Кур’єрська доставка",
      deliveryTime: "Термін доставки",
      deliveryTimeValue:
        "Залежить від місця призначення й можливостей перевізника",
      cost: "Вартість",
      costValue: "Зазначена в підсумку замовлення",
      payment: "Оплата",
      cash: "Оплата при отриманні",
      onlinePayment: "Онлайн-оплата",
      importantTitle: "Важлива інформація",
      supportLink: "сторінка підтримки",
      importantItems: [
        "Перед оформленням перевірте вибрані розміри, кольори й кількості.",
        "Уважно перевірте ім’я отримувача, номер телефону та місце доставки.",
        "Термін доставки залежить від вашого регіону, роботи перевізника й доступності вибраної послуги.",
        "Вартість доставки зазначена в кошику та підсумку замовлення під час оформлення.",
        "Збережіть підтвердження й номер замовлення для звернень щодо покупки.",
        "Якщо вам надали дані для відстеження, перевіряйте рух посилки на сайті перевізника.",
        "Якщо потрібно змінити адресу або статус замовлення незрозумілий, зверніться до підтримки перед повторним оформленням.",
      ],
      supportBefore: "Якщо у вас є запитання, відвідайте нашу ",
      supportAfter: " або скористайтеся контактами внизу сторінки.",
      intro:
        "Дізнайтеся, як ми доставляємо замовлення та які способи оплати доступні. Оберіть зручний варіант і перевірте всі дані перед завершенням оформлення.",
      postOfficeDescription:
        "Доставка до відділення Нової пошти в Україні. Під час оформлення оберіть доставку до відділення й вкажіть місто та номер відділення.",
      postOfficeAdvice:
        "Перед оформленням перевірте дані відділення й отримувача. Оберіть зручне для вас відділення та перевірте графік його роботи перед отриманням посилки.",
      homeDescription:
        "Оберіть кур’єрську доставку, щоб отримати замовлення за своєю адресою. Вкажіть місто та повну адресу, включно з номером будинку й квартири, якщо потрібно.",
      homeAdvice:
        "Вкажіть номер телефону, за яким із вами можна зв’язатися щодо доставки. Уважно перевірте адресу. Якщо помітили помилку після оформлення, зверніться до підтримки, щоб уточнити можливі подальші дії.",
      cashDescription:
        "Оберіть оплату при отриманні під час оформлення. Перед підтвердженням покупки перевірте товари, їхню кількість і загальну суму.",
      cashAdvice:
        "Перед отриманням уточніть доступні способи оплати у відділенні або в кур’єра. Якщо маєте запитання щодо суми чи комісій перевізника, з’ясуйте їх перед прийняттям посилки.",
      onlineDescription:
        "Під час оформлення також доступна оплата карткою. Оберіть спосіб оплати й перед надсиланням замовлення перегляньте підсумок, зокрема знижки та вартість доставки.",
      demoWarning:
        "W.EAR наразі є демонстраційним магазином. Не вводьте справжні платіжні чи персональні дані. Поля картки лише демонструють оформлення замовлення й не є справжнім платіжним сервісом.",
    },
    returnsExchanges: {
      title: "Повернення й обмін",
      intro:
        "Річ не підійшла? Ви можете повернути або обміняти її протягом 14 днів.",
      termsLabel: "Термін і умови повернення",
      timeframe: "Термін",
      days: "14 днів",
      condition: "Стан товару",
      conditionText:
        "Річ має бути неношеною, непраною, з усіма бирками й в оригінальному пакуванні.",
      howItWorks: "Як це працює",
      eligibleLabel: "Товари, які можна повернути",
      acceptedTitle: "Що можна повернути",
      excludedTitle: "Що не можна повернути",
      contactSupport: "Зверніться до служби підтримки",
      contactSupportAfter:
        " та повідомте, що хочете повернути або обміняти товар. Підготуйте номер замовлення, щоб ми могли підказати подальші кроки.",
      steps: [
        {
          title: "Зв’яжіться з нами",
          text: "Повідомте, що хочете повернути або обміняти товар. Підготуйте номер замовлення, щоб ми могли підказати подальші кроки.",
        },
        {
          title: "Надішліть товар",
          text: "Надійно запакуйте товар і надішліть Новою поштою. Перед відправленням зв’яжіться з нами, щоб уточнити адресу повернення.",
        },
        {
          title: "Ми перевіримо товар",
          text: "Після отримання перевіримо стан товару, наявність бирок та оригінального пакування.",
        },
        {
          title: "Отримайте кошти або обміняйте товар",
          text: "Оберіть повернення коштів тим самим способом, яким оплачували покупку, або обмін на інший розмір чи товар за наявності.",
        },
      ],
      accepted: [
        "Товари в початковому стані",
        "З усіма прикріпленими бирками",
        "В оригінальному пакуванні",
        "Протягом 14 днів після отримання замовлення",
      ],
      excluded: [
        "Товари зі слідами носіння або прання",
        "Товари без бирок",
        "Спідня білизна та шкарпетки",
        "Товари, виготовлені на замовлення або персоналізовані",
      ],
    },
    privacyPolicy: {
      title: "Політика конфіденційності",
      informationTitle: "Інформація, яку ви надаєте",
      informationIntro:
        "Склад інформації залежить від функцій, якими ви користуєтеся:",
      usageTitle: "Як застосунок використовує інформацію",
      storageTitle: "Файли cookie та сховище браузера",
      storageIntro:
        "Сайт також використовує локальне сховище браузера для зберігання:",
      servicesTitle: "Зберігання даних і підключені сервіси",
      manageTitle: "Керування вашою інформацією",
      privacyTitle: "Як захистити свої дані",
      updatesTitle: "Запитання й оновлення",
      supportLink: "сторінка підтримки",
      informationItems: [
        "Для реєстрації потрібні електронна пошта й пароль. Застосунок зберігає хеш пароля, а не сам пароль.",
        "За бажанням ви можете додати до профілю ім’я, номер телефону та зображення.",
        "Якщо вхід через Google налаштовано й ви ним користуєтеся, застосунок отримує дані облікового запису, зокрема ідентифікатор Google, електронну пошту та ім’я для відображення.",
        "Кошик містить вибрані товари, розміри, кольори та кількості, прив’язані до гостьового ідентифікатора або облікового запису.",
        "Для оформлення замовлення використовуються дані отримувача, контактні дані, місце доставки, вибраний спосіб оплати та перелік товарів.",
      ],
      storageItems: [
        "Гостьового ідентифікатора для доступу до вашого кошика.",
        "Кешованого стану входу й електронної пошти облікового запису для інтерфейсу.",
        "Вашого вибору приховати повідомлення про демонстраційний магазин.",
      ],
      intro:
        "На цій сторінці пояснюється, як використовується інформація, коли ви переглядаєте W.EAR, створюєте обліковий запис або пробуєте оформити замовлення. Тут описано, які дані задіяні в цих функціях, роль файлів cookie та сховища браузера, а також куди звертатися із запитаннями про ваші дані.",
      demoWarning:
        "W.EAR — демонстраційний магазин. Використовуйте вигадані дані, коли випробовуєте обліковий запис і оформлення замовлення, та не надсилайте справжню персональну чи платіжну інформацію. Застосунок може зберігати навіть демонстраційні дані: позначка «демо» не означає, що все зникає після закриття браузера.",
      provideOnlyNeeded:
        "Надавайте лише інформацію, потрібну для випробування функції. Звертаючись до магазину щодо проблеми, не додавайте до повідомлення паролі, коди входу чи дані картки. Краще почати з номера замовлення та короткого опису проблеми.",
      accountUsage:
        "Дані облікового запису використовуються для реєстрації, входу й керування профілем. Дані сеансу допомагають серверу розпізнавати користувача, який увійшов. Дані кошика дозволяють завантажувати вибрані товари та прив’язувати гостьовий кошик до облікового запису під час входу.",
      checkoutUsage:
        "Під час оформлення зберігаються дані замовлення, щоб застосунок міг показати підтвердження та деталі. Вибір способу оплати — частина демонстрації. Він не означає, що проведено справжній платіж або що посилку буде відправлено. Не вводьте справжні дані картки в демонстраційній формі.",
      sessionCookies:
        "W.EAR використовує сеансовий файл cookie для зв’язку запитів браузера із сеансом на сервері. У поточному застосунку термін дії цього файлу становить одну добу. Поведінка сеансу також залежить від налаштувань браузера, виходу з облікового запису та очищення файлів cookie.",
      clearBrowserData:
        "Дані локального сховища можуть залишатися після закриття вкладки. Їх можна видалити в налаштуваннях даних сайтів у браузері. Очищення файлів cookie або локального сховища може завершити вхід, знову показати повідомлення про демоверсію чи від’єднати браузер від гостьового кошика. Очищення браузера саме по собі не видаляє записи, уже збережені на сервері.",
      backendStorage:
        "Функції облікового запису, кошика, сеансу й замовлень використовують серверну частину застосунку та базу даних. Запити до сайту також проходять через інфраструктуру хостингу. Технічні журнали можуть містити інформацію про запити чи сеанси, яка використовується для обслуговування застосунку й усунення несправностей.",
      connectedServices:
        "Вхід через Google, якщо його ввімкнено, передбачає з’єднання з Google. Перед продовженням перегляньте інформацію на екрані входу. Назва перевізника чи спосіб оплати, показані в демоверсії, самі по собі не означають, що ваші дані було передано цьому сервісу.",
      profileManagement:
        "У налаштуваннях облікового запису можна переглянути й змінити доступні поля профілю. Сайт також пропонує видалення облікового запису. Це відрізняється від очищення даних сайту в браузері: налаштування браузера впливають на інформацію на вашому пристрої, а видалення облікового запису — на його записи в застосунку.",
      retention:
        "Деяка інформація, зокрема записи замовлень і технічні журнали, може зберігатися окремо від профілю. Ця сторінка не обіцяє, що видалення облікового запису негайно видалить усі пов’язані записи чи резервні копії. Із запитаннями про збережені дані, їх виправлення або видалення скористайтеся контактами, описаними на сторінці підтримки. Не надсилайте конфіденційну інформацію в першому зверненні.",
      protectDetails:
        "Випробовуючи демонстраційний магазин, використовуйте вигадані дані. Для демонстраційного пароля оберіть такий, який не використовуєте деінде. Після роботи на спільному пристрої вийдіть з облікового запису й перевірте збережені дані браузера перед передачею пристрою іншій людині. Жоден онлайн-застосунок не може гарантувати абсолютного захисту від усіх ризиків.",
      questions:
        "Якщо не впевнені, як певна функція використовує інформацію, відвідайте сторінку підтримки й скористайтеся контактами на сайті. Поясніть, якої функції стосується питання, щоб його можна було зрозуміти без зайвих персональних даних.",
      updates:
        "Цю сторінку слід оновлювати, коли змінюються функції облікового запису, зберігання даних, оформлення замовлення чи підключених сервісів. Перед використанням нової функції перегляньте супровідну інформацію та поточну версію цієї сторінки.",
    },
  },
};

// Resolve existing English display values without changing IDs sent to the API.
const displayTranslations = new Map();
function indexDisplayText(english, ukrainian) {
  for (const key of Object.keys(english)) {
    if (typeof english[key] === "string" && typeof ukrainian?.[key] === "string") {
      displayTranslations.set(english[key], ukrainian[key]);
    } else if (english[key] && typeof english[key] === "object") {
      indexDisplayText(english[key], ukrainian?.[key]);
    }
  }
}
indexDisplayText(translations.en, translations.uk);
export function translateDisplay(value, language) {
  return language === "uk" ? (displayTranslations.get(value) ?? value) : value;
}
