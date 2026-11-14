import { Link } from "react-router-dom";
import "../styles/about.scss";

function About() {
  return (
    <article className="about">
      <section className="about-hero" aria-labelledby="about-title">
        <div className="about-hero__intro">
          <p className="about-hero__eyebrow">Our story</p>
          <p className="about-hero__description">
            W.EAR is a modern clothing store built on a passion for style,
            quality and everyday comfort.
          </p>
          <span className="about-hero__line" aria-hidden="true" />
        </div>
        <img
          className="about-hero__image"
          src="/about_page.png"
          alt="Folded everyday essentials on a black chair in soft afternoon light"
          fetchPriority="high"
          width="1122"
          height="1402"
        />
        <h1 id="about-title" className="about-hero__title">
          <span>About</span>
          <span>W.EAR</span>
        </h1>
      </section>

      <section className="home-guide about-section" aria-labelledby="about-everyday">
        <h2 id="about-everyday">Everyday clothing. A personal point of view.</h2>
        <p>
          W.EAR starts with a simple idea: the clothes you wear most often deserve
          as much thought as the clothes you save for a special occasion. The
          T-shirt you put on before a slow morning, the jeans that follow you
          through a busy afternoon, the hoodie you take when the evening turns
          cool — these pieces become part of your routine. We see an everyday
          wardrobe as a collection of familiar favourites, each with a purpose
          and plenty of ways to wear it.
        </p>
        <p>
          Our approach to style leaves room for the person wearing the clothes.
          Clean shapes and understated colours give you a starting point, while
          the combinations are yours to discover. A relaxed layer can soften a
          more structured look. A simple top can bring balance to a favourite pair
          of jeans. You might dress the same piece differently from one day to
          the next, and that freedom is part of what makes a wardrobe feel like
          your own.
        </p>
        <p>
          We bring together T-shirts, jeans, pants, hoodies and outerwear with
          real life in mind. There is space for quiet mornings, days on the move
          and plans that happen at the last minute. Rather than prescribing a
          single look, W.EAR invites you to explore the details, consider the fit
          and choose the pieces that feel natural to you. Personal style grows
          through wearing, combining and returning to what you love.
        </p>
        <p>
          The pieces that become favourites often have a quiet presence. They are easy to reach for when there is little time to think, yet still feel considered when you have a whole morning to put an outfit together. A familiar neckline, a comfortable waistband or a sleeve that sits just where you like it can shape the way you feel throughout the day. That is the everyday perspective behind W.EAR: paying attention to clothing in the moments when it is actually worn, from leaving the house to coming home again.
        </p>
        <p>
          Your routine is a useful place to begin when thinking about personal style. Perhaps you spend most of the day moving between different places, or perhaps you need a few comfortable combinations for a more settled schedule. Some days call for layers that are easy to take off and carry; others call for a simple outfit that feels complete on its own. Looking at these small patterns can help you understand which pieces earn their place in your wardrobe and which details matter most to you.
        </p>
        <p>
          We like the possibilities that open up around a familiar foundation. Start with jeans and a plain T-shirt, then change the outer layer, the proportions or the way the sleeves are worn. A hoodie can give the combination a softer feeling, while a more structured jacket brings a different outline. Even small adjustments can change the character of an outfit. The starting pieces stay familiar, and the way you bring them together becomes an expression of your own taste.
        </p>
        <p>
          Colour is another part of that conversation. You may feel most at home in a narrow range of shades, or enjoy bringing a different tone into an otherwise simple look. Notice the colours you already wear together and the ones that make getting dressed feel effortless. An everyday wardrobe does not need to follow a fixed formula. It can have a clear sense of continuity while leaving room for a favourite accent, an unexpected pairing or a piece you discover along the way.
        </p>
        <p>
          Personal style also changes with time. The shapes you enjoy this season may sit differently alongside the clothes you loved a year ago, and your daily needs may change as well. There is room to keep what feels familiar and explore what feels new. Returning to a piece after a while can reveal another way to wear it, especially when you combine it with a different layer or approach its proportions with fresh eyes. A wardrobe can develop gradually through these ordinary discoveries.
        </p>
        <p>
          W.EAR is a place to explore those choices at your own pace. Look through the collection with your existing favourites in mind, imagine the occasions that make up your week and consider the combinations you would enjoy repeating. The aim is a wardrobe that feels connected to the way you live. From a first layer to a finishing touch, each piece can contribute to something personal, practical and comfortable enough to become part of your everyday story.
        </p>
      </section>

      <section className="home-guide about-section" aria-labelledby="about-details">
        <h2 id="about-details">Thoughtful choices, down to the details</h2>
        <p>
          A good wardrobe works as a whole. When you find something new, it helps
          to imagine how it will sit alongside the pieces you already reach for.
          Consider the shape of a sleeve, the length of a layer and the way a
          colour changes the mood of an outfit. These small decisions make
          getting dressed feel more intuitive. Our collection is an invitation
          to look closely and choose with your own habits, preferences and daily
          rhythm in mind.
        </p>
        <h3>Comfort that belongs in your routine</h3>
        <p>
          Comfort is personal. For some, it means an easy silhouette and room to
          layer; for others, it is a more defined fit that feels familiar from
          the moment they put it on. Think about where and how you will wear a
          piece, whether you prefer extra room and what you want to wear
          underneath it. Product photos, descriptions and available measurements
          can help you understand each item before deciding what works for you.
          The best starting point is always the way you want to feel.
        </p>
        <h3>More ways to wear the essentials</h3>
        <p>
          Versatility comes from simple connections. A T-shirt works on its own
          or under an open shirt; denim can anchor a casual outfit or sit
          alongside a sharper outer layer. Neutral shades are easy to combine,
          while a different proportion or texture can make a familiar outfit
          feel fresh. Start with a few combinations you enjoy, then experiment
          with the balance of relaxed and structured pieces. There is no need
          to rebuild everything to find a new perspective on your everyday look.
        </p>
        <p>
          Looking after what you own is part of that relationship, too. Follow
          the care instructions on each garment, choose washing and drying
          methods suited to its fabric and give your clothes the attention they
          need between wears. Getting to know a piece — how it fits, how it
          layers and how to care for it — helps it find a lasting place in your
          routine.
        </p>
        <p>
          Proportion is a useful detail to notice when building a combination. A wider trouser leg creates a different outline from a closer cut, and the length of a top can change how the whole outfit sits. Try thinking about the relationship between pieces rather than looking at each one in isolation. A shorter layer might reveal more of the shape underneath, while a longer outer layer can bring everything together. The balance that feels right depends on your preferences and how you like to move.
        </p>
        <p>
          The same attention applies to layering. Begin with the piece closest to the body and consider how much space you want around it. A comfortable first layer can sit under a hoodie, an open shirt or a jacket, but each combination will have its own feel. Think about sleeve volume, necklines and the length of the hem. Giving those details a moment of thought can help you picture an outfit more clearly before choosing another piece to add to it.
        </p>
        <p>
          Texture adds interest even when the colours stay close together. The appearance of denim beside a simple jersey top is different from the effect of a softer layer worn over both. Notice the surfaces, seams and finishing details shown in product images, and read the material information available for the item. These details help build a fuller picture of a garment. They also give you another way to make an understated outfit feel considered without adding more colours or accessories.
        </p>
        <p>
          When considering fit, a favourite garment you already own can be a useful reference. Think about what you enjoy about it: the room through the shoulders, the position of the waist or the length that works with your other clothes. Compare available product measurements carefully and check how they are described. Your usual size is only one part of the decision, since different cuts can create different silhouettes. The goal is to understand the piece well enough to choose the feeling you want.
        </p>
        <p>
          An everyday wardrobe also moves between settings. A combination that works for a relaxed morning may need another layer for an evening outside, or a different balance for a day with more plans. Consider which pieces help you make those changes easily. An outer layer that works with several tops, or pants that sit comfortably alongside different silhouettes, can give you more options throughout the week. This is where thoughtful choices become useful in the small practical moments of getting dressed.
        </p>
        <p>
          Before adding something new, imagine a few complete outfits around it. You might picture it with your most familiar jeans, with a different pair of pants and under a layer you already enjoy. If those combinations feel natural, the piece may fit easily into your routine. If you are trying a shape that is new to you, consider starting with the colours and accessories you know best. Familiar surroundings can give you room to explore a different detail with confidence.
        </p>
        <p>
          Care begins with understanding the garment in front of you. Check its label before washing, pay attention to any instructions about temperature or drying and consider whether it needs washing after every wear. Different materials and finishes have different needs, so a routine that suits one item may not suit another. Small habits such as storing clothes thoughtfully and checking them before putting them away can help keep your wardrobe organised and ready for the next time you wear it.
        </p>
        <p>
          These details belong together: fit, proportion, texture, versatility and care all influence how clothing becomes part of daily life. You do not need to resolve every choice at once. Begin with the qualities you notice most, use the available product information and let your own experience guide what comes next. The more clearly you understand what makes a garment work for you, the easier it becomes to recognise pieces that will sit comfortably alongside the rest of your wardrobe.
        </p>
      </section>

      <section className="home-guide about-section" aria-labelledby="about-conclusion">
        <h2 id="about-conclusion">Your everyday. Your style. W.EAR.</h2>
        <p>
          At its heart, W.EAR is about making space for clothing that feels like
          you. Style, quality and comfort guide the way we think about everyday
          essentials, but it is your life that gives those pieces meaning. An
          outfit becomes personal through the places you take it, the things you
          do in it and the small choices that make it yours. We want our
          collection to be a useful starting point for that process.
        </p>
        <p>
          Whether you are looking for one missing layer or taking a fresh look
          at your wardrobe, take your time and explore. Choose a fit you enjoy,
          a colour you return to and pieces you can imagine wearing in more
          than one way. Build on what already works, leave room to try something
          different and let your wardrobe evolve with you. Everyday clothing
          should feel easy to come back to.
        </p>
        <p>
          The ideas that guide W.EAR come together in a simple daily experience: opening your wardrobe and finding possibilities that make sense to you. A comfortable foundation, a few familiar shapes and room for individual choices can make that moment feel more natural. Some mornings you may want to try a new combination; on others, you may return to an outfit you know well. Both are part of the same personal relationship with clothing, built through use and shaped by your own preferences.
        </p>
        <p>
          We see the collection as part of a wider wardrobe story. The clothes you already own, the pieces you have kept for years and the things you are still discovering all have a place in it. Something new can sit alongside those favourites and bring another possibility into view. It might complete a combination you have been imagining or simply become an easy option for ordinary days. Its value to you comes through the ways it fits into your life.
        </p>
        <p>
          There is no single pace for building that wardrobe. You might know exactly which piece you are looking for, or prefer to browse and consider the details before deciding. Take time to imagine the fit, read the information provided and think about how the item connects to what you enjoy wearing. A choice can be small and still feel meaningful when it answers a real need, brings comfort to your routine or gives you a new way to wear something familiar.
        </p>
        <p>
          The same freedom applies to how you put everything together. Repeat the outfits that feel good, revisit pieces you have overlooked and experiment when the mood arrives. Your style can stay understated, change with the seasons or develop around a few recognisable favourites. What matters is that it feels connected to you. The most useful inspiration often comes from noticing the clothes you reach for and understanding why you enjoy wearing them.
        </p>
        <p>
          That is the spirit we want to carry through W.EAR: a thoughtful approach to everyday clothing, an appreciation for simple details and a belief in individual choice. From the first T-shirt in a combination to the layer you put on as you leave, there is space to create something that suits your day. Explore with curiosity, choose with your own routine in mind and let the way you wear each piece become the finishing detail.
        </p>
        <p>Wear what feels right. Wear it your way.</p>
        <Link className="about-section__link" to="/catalog">Explore the collection <span aria-hidden="true">→</span></Link>
      </section>
    </article>
  );
}

export default About;
