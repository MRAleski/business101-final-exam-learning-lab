const TERMS = [
  {
    "module": "Module 1",
    "category": "Legal Foundations",
    "term": "Primary Sources of Law",
    "definition": "The main sources courts use to decide legal issues: constitutions, statutes, administrative regulations, and case law.",
    "example": "A business dispute may involve a state statute and prior court decisions interpreting it.",
    "mistake": "Thinking only statutes count as law.",
    "misconception": "Primary Sources of Law: Thinking only statutes count as law.",
    "tfAnswer": false
  },
  {
    "module": "Module 1",
    "category": "Legal Foundations",
    "term": "Precedent",
    "definition": "A prior court decision that guides later courts when similar facts and legal issues appear.",
    "example": "A court follows an earlier decision from a higher court in the same jurisdiction.",
    "mistake": "Thinking every old case automatically controls every new case.",
    "misconception": "Precedent: Thinking every old case automatically controls every new case.",
    "tfAnswer": false
  },
  {
    "module": "Module 1",
    "category": "Legal Foundations",
    "term": "Civil Law",
    "definition": "Law dealing with private rights and remedies, usually involving damages or court orders.",
    "example": "A customer sues a business for breach of contract.",
    "mistake": "Confusing civil liability with criminal punishment.",
    "misconception": "Civil Law: Confusing civil liability with criminal punishment.",
    "tfAnswer": false
  },
  {
    "module": "Module 1",
    "category": "Legal Foundations",
    "term": "Criminal Law",
    "definition": "Law dealing with offenses against society, prosecuted by government.",
    "example": "The state prosecutes a person for fraud.",
    "mistake": "Thinking the victim personally prosecutes the criminal case.",
    "misconception": "Criminal Law: Thinking the victim personally prosecutes the criminal case.",
    "tfAnswer": false
  },
  {
    "module": "Module 1",
    "category": "Legal Foundations",
    "term": "Judicial Review",
    "definition": "The power of courts to determine whether laws or government actions violate the Constitution.",
    "example": "A court strikes down a statute that conflicts with constitutional rights.",
    "mistake": "Thinking courts only apply laws and never evaluate them.",
    "misconception": "Judicial Review: Thinking courts only apply laws and never evaluate them.",
    "tfAnswer": false
  },
  {
    "module": "Module 1",
    "category": "Legal Foundations",
    "term": "Alternative Dispute Resolution",
    "definition": "Methods for resolving disputes outside ordinary litigation, including negotiation, mediation, and arbitration.",
    "example": "Two businesses use mediation before filing a lawsuit.",
    "mistake": "Assuming every legal dispute must go to trial.",
    "misconception": "Alternative Dispute Resolution: Assuming every legal dispute must go to trial.",
    "tfAnswer": false
  },
  {
    "module": "Module 1",
    "category": "Legal Foundations",
    "term": "Jurisdiction",
    "definition": "A court's authority to hear and decide a case.",
    "example": "A state court must have authority over the parties or subject matter.",
    "mistake": "Thinking any court can hear any dispute.",
    "misconception": "Jurisdiction: Thinking any court can hear any dispute.",
    "tfAnswer": false
  },
  {
    "module": "Module 1",
    "category": "Legal Foundations",
    "term": "Liability",
    "definition": "Legal responsibility for an act, omission, debt, or injury.",
    "example": "A company may be liable if its employee negligently harms a customer while working.",
    "mistake": "Thinking liability always means someone committed a crime.",
    "misconception": "Liability: Thinking liability always means someone committed a crime.",
    "tfAnswer": false
  },
  {
    "module": "Module 2",
    "category": "Contracts and Torts",
    "term": "Contract",
    "definition": "A legally enforceable agreement between parties.",
    "example": "A supplier agrees to deliver inventory for a set price.",
    "mistake": "Thinking every promise is automatically enforceable.",
    "misconception": "Contract: Thinking every promise is automatically enforceable.",
    "tfAnswer": false
  },
  {
    "module": "Module 2",
    "category": "Contracts and Torts",
    "term": "Offer",
    "definition": "A clear proposal showing willingness to enter a contract on specific terms.",
    "example": "A seller offers to sell equipment for $4,000 with delivery next week.",
    "mistake": "Confusing preliminary negotiations with an offer.",
    "misconception": "Offer: Confusing preliminary negotiations with an offer.",
    "tfAnswer": false
  },
  {
    "module": "Module 2",
    "category": "Contracts and Torts",
    "term": "Acceptance",
    "definition": "Agreement to the terms of an offer in the required manner.",
    "example": "A buyer signs the purchase agreement before the offer expires.",
    "mistake": "Thinking a changed response is acceptance instead of a counteroffer.",
    "misconception": "Acceptance: Thinking a changed response is acceptance instead of a counteroffer.",
    "tfAnswer": false
  },
  {
    "module": "Module 2",
    "category": "Contracts and Torts",
    "term": "Consideration",
    "definition": "Something of legal value exchanged between contracting parties.",
    "example": "One party pays money and the other delivers services.",
    "mistake": "Thinking consideration must be equal in dollar value.",
    "misconception": "Consideration: Thinking consideration must be equal in dollar value.",
    "tfAnswer": false
  },
  {
    "module": "Module 2",
    "category": "Contracts and Torts",
    "term": "Tort",
    "definition": "A civil wrong that causes injury or harm and can create liability.",
    "example": "A store fails to clean a spill and a customer is injured.",
    "mistake": "Thinking torts always require a written agreement.",
    "misconception": "Tort: Thinking torts always require a written agreement.",
    "tfAnswer": false
  },
  {
    "module": "Module 2",
    "category": "Contracts and Torts",
    "term": "Negligence",
    "definition": "Failure to use reasonable care, causing harm to another person.",
    "example": "A delivery driver runs a red light and causes a crash.",
    "mistake": "Thinking negligence requires intent to harm.",
    "misconception": "Negligence: Thinking negligence requires intent to harm.",
    "tfAnswer": false
  },
  {
    "module": "Module 2",
    "category": "Contracts and Torts",
    "term": "Comparative Negligence",
    "definition": "A defense that reduces damages based on the injured party's share of fault.",
    "example": "A plaintiff who is 30% at fault may recover reduced damages.",
    "mistake": "Thinking any plaintiff fault eliminates recovery automatically.",
    "misconception": "Comparative Negligence: Thinking any plaintiff fault eliminates recovery automatically.",
    "tfAnswer": false
  },
  {
    "module": "Module 2",
    "category": "Contracts and Torts",
    "term": "General Damages",
    "definition": "Damages for non-economic harm such as pain and suffering.",
    "example": "A tort plaintiff seeks damages for emotional distress after an injury.",
    "mistake": "Confusing general damages with medical bills or lost wages.",
    "misconception": "General Damages: Confusing general damages with medical bills or lost wages.",
    "tfAnswer": false
  },
  {
    "module": "Module 3",
    "category": "Business Organizations",
    "term": "Sole Proprietorship",
    "definition": "A business owned by one person with no legal separation between owner and business.",
    "example": "A freelance designer operates under her own name.",
    "mistake": "Thinking it gives limited liability.",
    "misconception": "Sole Proprietorship: Thinking it gives limited liability.",
    "tfAnswer": false
  },
  {
    "module": "Module 3",
    "category": "Business Organizations",
    "term": "Partnership",
    "definition": "A business owned by two or more persons who share profits and management unless agreed otherwise.",
    "example": "Two people open a repair shop together and split profits.",
    "mistake": "Ignoring personal liability risk.",
    "misconception": "Partnership: Ignoring personal liability risk.",
    "tfAnswer": false
  },
  {
    "module": "Module 3",
    "category": "Business Organizations",
    "term": "Limited Liability Company",
    "definition": "A flexible business entity that can provide limited liability and pass-through taxation.",
    "example": "A small logistics consulting firm forms an LLC.",
    "mistake": "Thinking an LLC removes all personal responsibility for wrongful acts.",
    "misconception": "Limited Liability Company: Thinking an LLC removes all personal responsibility for wrongful acts.",
    "tfAnswer": false
  },
  {
    "module": "Module 3",
    "category": "Business Organizations",
    "term": "Corporation",
    "definition": "A legal entity separate from its owners.",
    "example": "A corporation owns property, signs contracts, and issues stock.",
    "mistake": "Thinking shareholders are always personally liable for corporate debts.",
    "misconception": "Corporation: Thinking shareholders are always personally liable for corporate debts.",
    "tfAnswer": false
  },
  {
    "module": "Module 3",
    "category": "Business Organizations",
    "term": "Limited Liability",
    "definition": "A rule limiting an owner's financial risk to the investment in the business.",
    "example": "A shareholder generally risks the amount invested in stock.",
    "mistake": "Treating limited liability as a shield for fraud or personal misconduct.",
    "misconception": "Limited Liability: Treating limited liability as a shield for fraud or personal misconduct.",
    "tfAnswer": false
  },
  {
    "module": "Module 3",
    "category": "Business Organizations",
    "term": "Piercing the Corporate Veil",
    "definition": "Holding owners personally liable when they misuse the business entity.",
    "example": "An owner commingles personal and company funds so badly the firm has no separate identity.",
    "mistake": "Thinking filing articles of incorporation is an unbreakable shield.",
    "misconception": "Piercing the Corporate Veil: Thinking filing articles of incorporation is an unbreakable shield.",
    "tfAnswer": false
  },
  {
    "module": "Module 3",
    "category": "Business Organizations",
    "term": "Franchise",
    "definition": "A business arrangement allowing one party to use another's brand and operating system.",
    "example": "A local owner operates under a national restaurant brand.",
    "mistake": "Thinking franchisees can ignore brand standards.",
    "misconception": "Franchise: Thinking franchisees can ignore brand standards.",
    "tfAnswer": false
  },
  {
    "module": "Module 3",
    "category": "Business Organizations",
    "term": "Shareholder Derivative Suit",
    "definition": "A lawsuit brought by a shareholder on behalf of the corporation when directors fail to act.",
    "example": "A shareholder sues to recover damages for harm done to the corporation.",
    "mistake": "Thinking recovered damages go directly to the suing shareholder.",
    "misconception": "Shareholder Derivative Suit: Thinking recovered damages go directly to the suing shareholder.",
    "tfAnswer": false
  },
  {
    "module": "Module 4",
    "category": "Agency and Employment",
    "term": "Agency Relationship",
    "definition": "A relationship where an agent acts for a principal and can affect the principal's legal position.",
    "example": "A purchasing agent negotiates contracts for a company.",
    "mistake": "Thinking agency requires a formal written contract every time.",
    "misconception": "Agency Relationship: Thinking agency requires a formal written contract every time.",
    "tfAnswer": false
  },
  {
    "module": "Module 4",
    "category": "Agency and Employment",
    "term": "Principal",
    "definition": "The person or organization for whom an agent acts.",
    "example": "A company hires a sales representative to make deals on its behalf.",
    "mistake": "Confusing the principal with the customer.",
    "misconception": "Principal: Confusing the principal with the customer.",
    "tfAnswer": false
  },
  {
    "module": "Module 4",
    "category": "Agency and Employment",
    "term": "Agent",
    "definition": "A person authorized to act on behalf of a principal.",
    "example": "A real estate agent lists and negotiates a sale for a property owner.",
    "mistake": "Thinking an agent owes no duties unless paid.",
    "misconception": "Agent: Thinking an agent owes no duties unless paid.",
    "tfAnswer": false
  },
  {
    "module": "Module 4",
    "category": "Agency and Employment",
    "term": "Duty of Loyalty",
    "definition": "An agent's duty to act in the principal's interest and avoid secret profits or conflicts.",
    "example": "An agent cannot secretly buy land and resell it to the principal at a markup.",
    "mistake": "Thinking good results excuse self-dealing.",
    "misconception": "Duty of Loyalty: Thinking good results excuse self-dealing.",
    "tfAnswer": false
  },
  {
    "module": "Module 4",
    "category": "Agency and Employment",
    "term": "Independent Contractor",
    "definition": "A worker who controls how work is performed and is not treated as an employee for many legal purposes.",
    "example": "A contractor completes a project using their own tools and schedule.",
    "mistake": "Looking only at the job title rather than control.",
    "misconception": "Independent Contractor: Looking only at the job title rather than control.",
    "tfAnswer": false
  },
  {
    "module": "Module 4",
    "category": "Agency and Employment",
    "term": "Employment-at-Will",
    "definition": "The default rule that employment can usually be ended by either party, subject to exceptions.",
    "example": "A handbook promising discharge only for good cause may limit at-will termination.",
    "mistake": "Thinking at-will means employers may fire for illegal reasons.",
    "misconception": "Employment-at-Will: Thinking at-will means employers may fire for illegal reasons.",
    "tfAnswer": false
  },
  {
    "module": "Module 4",
    "category": "Agency and Employment",
    "term": "Respondeat Superior",
    "definition": "A rule making an employer liable for certain employee torts committed within the scope of employment.",
    "example": "A delivery company may be liable for an employee's negligent driving during deliveries.",
    "mistake": "Assuming employers are liable for every act an employee commits.",
    "misconception": "Respondeat Superior: Assuming employers are liable for every act an employee commits.",
    "tfAnswer": false
  },
  {
    "module": "Module 4",
    "category": "Agency and Employment",
    "term": "Workers' Compensation",
    "definition": "A state system for compensating employees for work-related injuries.",
    "example": "A warehouse worker injured while lifting freight files a claim.",
    "mistake": "Thinking the worker must prove intentional wrongdoing by the employer.",
    "misconception": "Workers' Compensation: Thinking the worker must prove intentional wrongdoing by the employer.",
    "tfAnswer": false
  },
  {
    "module": "Module 5",
    "category": "Commercial Paper and Banking",
    "term": "Negotiable Instrument",
    "definition": "A written promise or order to pay money that meets legal requirements.",
    "example": "A properly written check may qualify as a negotiable instrument.",
    "mistake": "Thinking any informal IOU qualifies.",
    "misconception": "Negotiable Instrument: Thinking any informal IOU qualifies.",
    "tfAnswer": false
  },
  {
    "module": "Module 5",
    "category": "Commercial Paper and Banking",
    "term": "Check",
    "definition": "A draft ordering a bank to pay money from the drawer's account.",
    "example": "A customer writes a check to pay a vendor.",
    "mistake": "Forgetting checks may involve both UCC Article 3 and Article 4.",
    "misconception": "Check: Forgetting checks may involve both UCC Article 3 and Article 4.",
    "tfAnswer": false
  },
  {
    "module": "Module 5",
    "category": "Commercial Paper and Banking",
    "term": "Certified Check",
    "definition": "A check accepted by the bank in advance, confirming funds for payment.",
    "example": "A buyer obtains a certified check for a vehicle purchase.",
    "mistake": "Confusing it with an ordinary personal check.",
    "misconception": "Certified Check: Confusing it with an ordinary personal check.",
    "tfAnswer": false
  },
  {
    "module": "Module 5",
    "category": "Commercial Paper and Banking",
    "term": "Forged Drawer Signature",
    "definition": "An unauthorized signature on a check drawn on another person's account.",
    "example": "Someone signs another person's name to a check without permission.",
    "mistake": "Assuming the customer always bears the loss.",
    "misconception": "Forged Drawer Signature: Assuming the customer always bears the loss.",
    "tfAnswer": false
  },
  {
    "module": "Module 5",
    "category": "Commercial Paper and Banking",
    "term": "Electronic Fund Transfer",
    "definition": "A funds transfer made through electronic systems rather than paper checks.",
    "example": "ATM withdrawals, direct deposits, and debit card point-of-sale transactions.",
    "mistake": "Thinking every electronic payment follows the same rules as checks.",
    "misconception": "Electronic Fund Transfer: Thinking every electronic payment follows the same rules as checks.",
    "tfAnswer": false
  },
  {
    "module": "Module 5",
    "category": "Secured Transactions and Bankruptcy",
    "term": "Security Interest",
    "definition": "A creditor's legal right in collateral securing payment or performance.",
    "example": "A lender has a security interest in a financed vehicle.",
    "mistake": "Thinking collateral belongs to the creditor immediately.",
    "misconception": "Security Interest: Thinking collateral belongs to the creditor immediately.",
    "tfAnswer": false
  },
  {
    "module": "Module 5",
    "category": "Secured Transactions and Bankruptcy",
    "term": "Perfection",
    "definition": "The step that protects a secured creditor's interest against certain third parties.",
    "example": "A lender files a financing statement for equipment collateral.",
    "mistake": "Thinking the last creditor to perfect wins priority.",
    "misconception": "Perfection: Thinking the last creditor to perfect wins priority.",
    "tfAnswer": false
  },
  {
    "module": "Module 5",
    "category": "Secured Transactions and Bankruptcy",
    "term": "Chapter 7 Bankruptcy",
    "definition": "Liquidation bankruptcy where nonexempt assets may be sold to pay creditors.",
    "example": "An individual debtor seeks relief when debts cannot be paid.",
    "mistake": "Thinking Chapter 7 erases every debt.",
    "misconception": "Chapter 7 Bankruptcy: Thinking Chapter 7 erases every debt.",
    "tfAnswer": false
  },
  {
    "module": "Module 5",
    "category": "Secured Transactions and Bankruptcy",
    "term": "Chapter 11 Bankruptcy",
    "definition": "Reorganization bankruptcy often used by businesses to continue operating while restructuring debts.",
    "example": "A company operates as debtor in possession while proposing a plan.",
    "mistake": "Thinking Chapter 11 always means immediate closure.",
    "misconception": "Chapter 11 Bankruptcy: Thinking Chapter 11 always means immediate closure.",
    "tfAnswer": false
  },
  {
    "module": "Module 6",
    "category": "Consumer Protection",
    "term": "Deceptive Advertising",
    "definition": "Advertising that misleads consumers or makes false factual claims.",
    "example": "A company falsely claims a competitor's product is unsafe.",
    "mistake": "Confusing factual deception with ordinary sales puffery.",
    "misconception": "Deceptive Advertising: Confusing factual deception with ordinary sales puffery.",
    "tfAnswer": false
  },
  {
    "module": "Module 6",
    "category": "Consumer Protection",
    "term": "State Consumer Fraud Statute",
    "definition": "A state law prohibiting unfair or deceptive acts in consumer transactions.",
    "example": "A business misrepresents a product's capabilities to consumers.",
    "mistake": "Thinking every bad purchase proves consumer fraud.",
    "misconception": "State Consumer Fraud Statute: Thinking every bad purchase proves consumer fraud.",
    "tfAnswer": false
  },
  {
    "module": "Module 6",
    "category": "Consumer Protection",
    "term": "Truth in Lending Act",
    "definition": "A law requiring clear disclosure of consumer credit terms.",
    "example": "A store financing agreement discloses APR and finance charges.",
    "mistake": "Thinking the law sets all interest rates.",
    "misconception": "Truth in Lending Act: Thinking the law sets all interest rates.",
    "tfAnswer": false
  },
  {
    "module": "Module 6",
    "category": "Consumer Protection",
    "term": "Fair Credit Reporting Act",
    "definition": "A law giving consumers rights to dispute and correct inaccurate credit report information.",
    "example": "A consumer disputes unverifiable false information in a credit file.",
    "mistake": "Thinking credit bureaus can keep false information indefinitely.",
    "misconception": "Fair Credit Reporting Act: Thinking credit bureaus can keep false information indefinitely.",
    "tfAnswer": false
  },
  {
    "module": "Module 6",
    "category": "Consumer Protection",
    "term": "Fair Debt Collection Practices Act",
    "definition": "A law restricting abusive or unfair debt collection practices.",
    "example": "A collector keeps calling a consumer at work after learning the employer objects.",
    "mistake": "Thinking collectors may use any pressure tactic if the debt is real.",
    "misconception": "Fair Debt Collection Practices Act: Thinking collectors may use any pressure tactic if the debt is real.",
    "tfAnswer": false
  },
  {
    "module": "Module 6",
    "category": "Consumer Protection",
    "term": "Product Labeling",
    "definition": "Required information placed on products to inform consumers or comply with law.",
    "example": "A vehicle includes an EPA fuel economy label.",
    "mistake": "Thinking labels are optional marketing choices only.",
    "misconception": "Product Labeling: Thinking labels are optional marketing choices only.",
    "tfAnswer": false
  },
  {
    "module": "Module 6",
    "category": "Consumer Protection",
    "term": "Product Safety Regulation",
    "definition": "Rules designed to reduce hazards from products sold to consumers.",
    "example": "A manufacturer reports a product that has proved hazardous.",
    "mistake": "Thinking safety duties end once the product is sold.",
    "misconception": "Product Safety Regulation: Thinking safety duties end once the product is sold.",
    "tfAnswer": false
  },
  {
    "module": "Module 6",
    "category": "Consumer Protection",
    "term": "Price Discrimination",
    "definition": "Charging different buyers different prices for similar goods under conditions that may harm competition.",
    "example": "A seller gives one reseller better pricing than another for the same product class.",
    "mistake": "Thinking every coupon or student discount is illegal.",
    "misconception": "Price Discrimination: Thinking every coupon or student discount is illegal.",
    "tfAnswer": false
  },
  {
    "module": "Module 7",
    "category": "Securities and Antitrust",
    "term": "Security",
    "definition": "An investment interest such as stock, bond, or other instrument regulated by securities law.",
    "example": "Corporate stock represents ownership in a company.",
    "mistake": "Thinking stock represents corporate debt.",
    "misconception": "Security: Thinking stock represents corporate debt.",
    "tfAnswer": false
  },
  {
    "module": "Module 7",
    "category": "Securities and Antitrust",
    "term": "Stock",
    "definition": "An ownership interest in a corporation.",
    "example": "A shareholder owns shares of common stock.",
    "mistake": "Confusing stock with bonds or corporate debt.",
    "misconception": "Stock: Confusing stock with bonds or corporate debt.",
    "tfAnswer": false
  },
  {
    "module": "Module 7",
    "category": "Securities and Antitrust",
    "term": "Bond",
    "definition": "A debt instrument showing that the issuer owes money to the bondholder.",
    "example": "A corporation issues bonds to borrow capital.",
    "mistake": "Thinking bonds are ownership shares.",
    "misconception": "Bond: Thinking bonds are ownership shares.",
    "tfAnswer": false
  },
  {
    "module": "Module 7",
    "category": "Securities and Antitrust",
    "term": "Securities Act of 1933",
    "definition": "A federal law focused on truthful disclosure when securities are first offered to investors.",
    "example": "A company issuing stock must avoid material misstatements in offering documents.",
    "mistake": "Thinking the law guarantees investments will be profitable.",
    "misconception": "Securities Act of 1933: Thinking the law guarantees investments will be profitable.",
    "tfAnswer": false
  },
  {
    "module": "Module 7",
    "category": "Securities and Antitrust",
    "term": "Securities Exchange Act of 1934",
    "definition": "A federal law regulating securities trading markets and ongoing public company reporting.",
    "example": "Public companies file periodic reports and insiders face trading restrictions.",
    "mistake": "Thinking it applies only to original stock offerings.",
    "misconception": "Securities Exchange Act of 1934: Thinking it applies only to original stock offerings.",
    "tfAnswer": false
  },
  {
    "module": "Module 7",
    "category": "Securities and Antitrust",
    "term": "Insider Trading",
    "definition": "Trading securities using material nonpublic information in violation of a duty.",
    "example": "An executive buys stock before secret merger news becomes public.",
    "mistake": "Thinking all employee stock trading is illegal.",
    "misconception": "Insider Trading: Thinking all employee stock trading is illegal.",
    "tfAnswer": false
  },
  {
    "module": "Module 7",
    "category": "Securities and Antitrust",
    "term": "Antitrust Law",
    "definition": "Laws designed to protect competition and prevent unfair restraints of trade.",
    "example": "Competitors may not agree to fix prices.",
    "mistake": "Thinking all large companies violate antitrust law.",
    "misconception": "Antitrust Law: Thinking all large companies violate antitrust law.",
    "tfAnswer": false
  },
  {
    "module": "Module 7",
    "category": "Securities and Antitrust",
    "term": "Monopolization",
    "definition": "Improper acquisition or maintenance of monopoly power in a relevant market.",
    "example": "A firm uses exclusionary conduct to keep rivals out.",
    "mistake": "Thinking market success alone is illegal.",
    "misconception": "Monopolization: Thinking market success alone is illegal.",
    "tfAnswer": false
  },
  {
    "module": "Module 7",
    "category": "Securities and Antitrust",
    "term": "Predatory Pricing",
    "definition": "Selling below cost to eliminate competitors and later raise prices.",
    "example": "A dominant firm sells below cost long enough to force rivals out.",
    "mistake": "Calling every low price predatory pricing.",
    "misconception": "Predatory Pricing: Calling every low price predatory pricing.",
    "tfAnswer": false
  },
  {
    "module": "Module 8",
    "category": "Property and Environment",
    "term": "Real Property",
    "definition": "Land and things attached to land, plus certain rights connected to land.",
    "example": "A warehouse and the land underneath it are real property.",
    "mistake": "Thinking real property means only soil.",
    "misconception": "Real Property: Thinking real property means only soil.",
    "tfAnswer": false
  },
  {
    "module": "Module 8",
    "category": "Property and Environment",
    "term": "Personal Property",
    "definition": "Movable property and ownership interests other than real property.",
    "example": "Inventory, vehicles, tools, and certain intangible rights.",
    "mistake": "Thinking the concept cannot evolve with new forms of ownership.",
    "misconception": "Personal Property: Thinking the concept cannot evolve with new forms of ownership.",
    "tfAnswer": false
  },
  {
    "module": "Module 8",
    "category": "Property and Environment",
    "term": "Tenancy in Common",
    "definition": "Co-ownership where each owner's share can pass to heirs.",
    "example": "Two people own a cottage, and one owner's share passes to heirs at death.",
    "mistake": "Confusing it with joint tenancy.",
    "misconception": "Tenancy in Common: Confusing it with joint tenancy.",
    "tfAnswer": false
  },
  {
    "module": "Module 8",
    "category": "Property and Environment",
    "term": "Mechanic's Lien",
    "definition": "A lien on real property for labor or materials used to improve it.",
    "example": "A contractor files a lien after not being paid for building improvements.",
    "mistake": "Confusing it with an artisan's lien.",
    "misconception": "Mechanic's Lien: Confusing it with an artisan's lien.",
    "tfAnswer": false
  },
  {
    "module": "Module 8",
    "category": "Property and Environment",
    "term": "Artisan's Lien",
    "definition": "A possessory lien for labor or services performed on personal property.",
    "example": "A repair shop keeps a repaired machine until the bill is paid.",
    "mistake": "Thinking it applies to real estate improvements.",
    "misconception": "Artisan's Lien: Thinking it applies to real estate improvements.",
    "tfAnswer": false
  },
  {
    "module": "Module 8",
    "category": "Property and Environment",
    "term": "Environmental Impact Statement",
    "definition": "A formal analysis for major federal actions significantly affecting the environment.",
    "example": "A federal-land project may require environmental review before approval.",
    "mistake": "Thinking every private business decision requires one.",
    "misconception": "Environmental Impact Statement: Thinking every private business decision requires one.",
    "tfAnswer": false
  },
  {
    "module": "Module 8",
    "category": "Property and Environment",
    "term": "Safe Drinking Water Act",
    "definition": "A federal law setting standards for public drinking water systems.",
    "example": "A municipal water system must meet EPA contaminant limits.",
    "mistake": "Thinking local water systems can ignore federal standards.",
    "misconception": "Safe Drinking Water Act: Thinking local water systems can ignore federal standards.",
    "tfAnswer": false
  },
  {
    "module": "Module 8",
    "category": "International and Regulatory",
    "term": "Foreign Corporation",
    "definition": "A corporation doing business in a state other than the one where it was incorporated.",
    "example": "A Delaware corporation operating in Indiana is foreign to Indiana.",
    "mistake": "Thinking foreign always means outside the United States.",
    "misconception": "Foreign Corporation: Thinking foreign always means outside the United States.",
    "tfAnswer": false
  },
  {
    "module": "Module 8",
    "category": "International and Regulatory",
    "term": "Normal Trade Relations",
    "definition": "A trade status providing another country with favorable trade treatment under trade rules.",
    "example": "A WTO member receives most-favored treatment regarding imports and exports.",
    "mistake": "Thinking it means a special advantage over every country.",
    "misconception": "Normal Trade Relations: Thinking it means a special advantage over every country.",
    "tfAnswer": false
  },
  {
    "module": "Module 8",
    "category": "International and Regulatory",
    "term": "Whistleblower",
    "definition": "An employee who reports illegal, unsafe, or unethical activity.",
    "example": "An employee reports securities fraud or serious safety violations.",
    "mistake": "Confusing whistleblowing with ordinary workplace complaints.",
    "misconception": "Whistleblower: Confusing whistleblowing with ordinary workplace complaints.",
    "tfAnswer": false
  }
];

const SCENARIOS = [
  {
    "module": "Module 3",
    "category": "Business Organizations",
    "prompt": "A shareholder pays personal bills from the corporate account and keeps no separation between personal and business funds. What is the risk?",
    "choices": [
      "Piercing the Corporate Veil",
      "Normal Trade Relations",
      "Certified Check",
      "Tenancy in Common"
    ],
    "answer": "Piercing the Corporate Veil",
    "feedback": "Commingling funds can destroy the separate identity of the corporation."
  },
  {
    "module": "Module 4",
    "category": "Agency and Employment",
    "prompt": "A buyer hired to acquire land secretly buys it first and resells it to the principal at a profit. Which duty is most directly breached?",
    "choices": [
      "Duty of Loyalty",
      "Truth in Lending Disclosure",
      "Perfection",
      "Environmental Review"
    ],
    "answer": "Duty of Loyalty",
    "feedback": "An agent cannot secretly profit from the agency relationship."
  },
  {
    "module": "Module 5",
    "category": "Commercial Paper and Banking",
    "prompt": "A bank agrees in advance to accept a check and confirms funds for payment. What is this?",
    "choices": [
      "Certified Check",
      "Mechanic's Lien",
      "Security Interest",
      "Franchise"
    ],
    "answer": "Certified Check",
    "feedback": "A certified check is accepted by the bank before payment."
  },
  {
    "module": "Module 5",
    "category": "Secured Transactions and Bankruptcy",
    "prompt": "A company wants to keep operating while restructuring its debts. Which bankruptcy chapter best fits?",
    "choices": [
      "Chapter 11 Bankruptcy",
      "Chapter 7 Bankruptcy",
      "COBRA",
      "Fair Credit Reporting Act"
    ],
    "answer": "Chapter 11 Bankruptcy",
    "feedback": "Chapter 11 is reorganization, often used by businesses."
  },
  {
    "module": "Module 7",
    "category": "Securities and Antitrust",
    "prompt": "A dominant company sells below cost to force competitors out, then plans to raise prices. What is the issue?",
    "choices": [
      "Predatory Pricing",
      "Price Puffery",
      "Certified Check",
      "Sole Proprietorship"
    ],
    "answer": "Predatory Pricing",
    "feedback": "Predatory pricing focuses on below-cost pricing plus competitive harm."
  },
  {
    "module": "Module 6",
    "category": "Consumer Protection",
    "prompt": "A debt collector keeps calling a consumer at work after learning the employer objects. Which law is most relevant?",
    "choices": [
      "Fair Debt Collection Practices Act",
      "Securities Act of 1933",
      "Safe Drinking Water Act",
      "Equal Pay Act"
    ],
    "answer": "Fair Debt Collection Practices Act",
    "feedback": "The FDCPA limits abusive and unfair collection practices."
  },
  {
    "module": "Module 8",
    "category": "Property and Environment",
    "prompt": "Two owners hold a cottage so one owner's share passes to heirs when that owner dies. What is this?",
    "choices": [
      "Tenancy in Common",
      "Joint Venture",
      "Certified Ownership",
      "Chapter 11 Possession"
    ],
    "answer": "Tenancy in Common",
    "feedback": "A tenancy in common allows an ownership share to pass to heirs."
  },
  {
    "module": "Module 1",
    "category": "Legal Foundations",
    "prompt": "A court follows a prior decision from a higher court in the same jurisdiction. What concept is being applied?",
    "choices": [
      "Precedent",
      "Consideration",
      "Perfection",
      "Limited Liability"
    ],
    "answer": "Precedent",
    "feedback": "Precedent promotes consistency in similar legal disputes."
  },
  {
    "module": "Module 2",
    "category": "Contracts and Torts",
    "prompt": "A plaintiff in a tort case seeks compensation for pain and suffering. What kind of damages are these?",
    "choices": [
      "General Damages",
      "Punitive Tariffs",
      "Security Interests",
      "Special Jurisdiction"
    ],
    "answer": "General Damages",
    "feedback": "Pain and suffering is a classic form of general damages."
  },
  {
    "module": "Module 7",
    "category": "Securities and Antitrust",
    "prompt": "A CEO intentionally understates company debt in documents used to sell stock to investors. What area of law is implicated?",
    "choices": [
      "Securities Law",
      "Workers' Compensation",
      "Real Property",
      "COBRA"
    ],
    "answer": "Securities Law",
    "feedback": "Material misstatements in securities offerings can create liability."
  },
  {
    "module": "Module 6",
    "category": "Consumer Protection",
    "prompt": "A credit reporting company refuses to remove unverifiable false information after a consumer dispute. Which law applies?",
    "choices": [
      "Fair Credit Reporting Act",
      "Truth in Lending Act",
      "Antitrust Law",
      "Franchise Law"
    ],
    "answer": "Fair Credit Reporting Act",
    "feedback": "The FCRA gives consumers correction and dispute rights."
  },
  {
    "module": "Module 8",
    "category": "Property and Environment",
    "prompt": "A contractor is unpaid for work improving real estate and files a claim against the property. What is likely involved?",
    "choices": [
      "Mechanic's Lien",
      "Artisan's Lien",
      "Certified Check",
      "Insider Trading"
    ],
    "answer": "Mechanic's Lien",
    "feedback": "A mechanic's lien secures payment for labor or materials on real property."
  }
];