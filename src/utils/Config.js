const BASE_URL = 'http://146.190.14.154:3002/';
const API_KEY = '88205f51-6bf5-45af-947e-8e6df51824e4';
const STRIPE_PUBLISHABLE_KEY = 'pk_test_042FOouJrBNY0QBodg2BhtM2';
const STRIPE_SECRET_KEY = 'sk_test_OOEjRjp4XoFrZLTM5vldmexV00WTrrD9l4';

const POST_TYPE = {
  IMAGE: 10,
  MULTI_IMAGE: 20,
  VIDEO: 30,
};

const PRAYER_TYPES = {
  MEDITATION: 'meditation'
};

const GUIDED_PRAYER_LIST = [
  {
    name: 'Meditation',
    image: require('../../assets/images/meditation-icon.png'), // Add this line
    subCategories: [
      {
        name: 'Thanksgiving',
        subCategories: [
          {
            name: 'Praise and Gratitude',
            prayers: [
              {
                title: "1 Chronicles 16:34",
                body: "O give thanks unto the Lord; for he is good; for his mercy endureth for ever."
              },
              {
                title: "Psalm 145:3",
                body: "Great is the Lord, and greatly to be praised; and his greatness is unsearchable."
              },
              {
                title: "Isaiah 25:1",
                body: "O Lord, thou art my God; I will exalt thee, I will praise thy name; for thou hast done wonderful things; thy counsels of old are faithfulness and truth."
              },
              {
                title: "Psalm 34:1",
                body: "I will bless the Lord at all times: his praise shall continually be in my mouth."
              },
              {
                title: "Psalm 96:4",
                body: "For the Lord is great, and greatly to be praised: he is to be feared above all gods."
              },
              {
                title: "Psalm 150:6",
                body: "Let every thing that hath breath praise the Lord. Praise ye the Lord."
              }
            ]
          },
          {
            name: 'Adoration',
            prayers: [
              {
                title: "Isaiah 25:1",
                body: "O Lord, thou art my God; I will exalt thee, I will praise thy name; for thou hast done wonderful things; thy counsels of old are faithfulness and truth."
              },
              {
                title: "Psalm 63:3-4",
                body: "Because thy lovingkindness is better than life, my lips shall praise thee. Thus will I bless thee while I live: I will lift up my hands in thy name."
              },
              {
                title: "1 Chronicles 29:11",
                body: "Thine, O Lord, is the greatness, and the power, and the glory, and the victory, and the majesty: for all that is in the heaven and in the earth is thine; thine is the kingdom, O Lord, and thou art exalted as head above all."
              },
              {
                title: "Psalm 148:13",
                body: "Let them praise the name of the Lord: for his name alone is excellent; his glory is above the earth and heaven."
              },
              {
                title: "Revelation 4:11",
                body: "Thou art worthy, O Lord, to receive glory and honor and power: for thou hast created all things, and for thy pleasure they are and were created."
              },
              {
                title: "Psalm 96:9",
                body: "O worship the Lord in the beauty of holiness: fear before him, all the earth."
              }
            ]
          }
        ]
      },
      {
        name: 'Deliverance',
        subCategories: [
          {
            name: 'Self-deliverance',
            prayers: [
              {
                title: "Steps for Self-Deliverance",
                body: "Step 1: Repentance 2 Chron 7:14\nPrayer: Lord, I seek Your forgiveness for all my sins, known and unknown. Search my heart, reveal any hidden sin, and cleanse me. I repent of [specific sins] and ask for Your mercy. Restore me, Lord. Amen."
              },
              {
                title: "Step 2: Renounce Amos 3:3",
                body: "Prayer: Father, I renounce every door I've opened to sin, including [specific areas]. I break all covenants and allegiance with these strongholds and cancel every demonic influence in my life. Take from me all that burdens me."
              },
              {
                title: "Step 3: Resist Matt 11:12",
                body: "Prayer: In Jesus' name, I take authority over every spirit influencing my life. I break the spirit of [specific stronghold] and declare freedom. I destroy every stronghold and proclaim victory in Jesus' name. Amen."
              },
              {
                title: "Step 4: Be Filled with the Holy Spirit Luke 11:13",
                body: "Prayer: Holy Spirit, fill me with Your power, presence, and gifts. Ignite Your fire in me, guide me, and take control of my life. Let Your light shine through me. Amen."
              }
            ]
          },
          {
            name: 'Repentance',
            prayers: [
              {
                title: "Psalm 51:1-2",
                body: "Prayer: Have mercy on me, O God, according to Your unfailing love; according to Your great compassion, blot out my transgressions. Wash away all my iniquity and cleanse me from my sin. Lord, I repent with a sincere heart and ask for Your cleansing touch. In Jesus name. Amen."
              },
              {
                title: "Heavenly Repentance",
                body: "Prayer: Heavenly Father, I repent of the blemish that has marred my priestly garment. Cleanse me with the blood of Jesus and remove every stain, corruption, and distortion. For Your name's sake, forgive my iniquities and restore to me the joy of Your salvation. Amen."
              },
              {
                title: "2 Chronicles 7:14",
                body: "Prayer: Lord, I humble myself before You, seeking Your face and turning from my wicked ways. Forgive my sins and heal my heart, my family, and my land. Let Your mercy flow over me. Amen."
              },
              {
                title: "Psalm 139:23-24",
                body: "Prayer: Search me, O God, and know my heart; test me and know my thoughts. Reveal any offensive way in me and lead me in the way everlasting. I repent of any wrongdoing and ask for Your guidance and direction. Amen."
              }
            ]
          },
          {
            name: 'Breaking Curses',
            prayers: [
              {
                title: "Galatians 3:13",
                body: "Prayer: Lord, I thank You that Christ has redeemed me from the curse of the law by becoming a curse for me. I stand on the victory of the cross and declare that every generational curse in my family line is broken in Jesus' name. Amen."
              },
              {
                title: "2 Corinthians 5:17",
                body: "Prayer: Father, I declare that I am a new creation in Christ; the old has passed away, and the new has come. I renounce every bloodline curse from my past and embrace the new life You have given me. Amen."
              },
              {
                title: "Ezekiel 18:20",
                body: "Prayer: The child will not share the guilt of the parent, nor will the parent share the guilt of the child. I break every cycle of sin, failure, and bondage in my family line. I declare that it ends with me today in the name of Jesus. Amen."
              }
            ]
          },
          {
            name: 'Demonic oppression',
            prayers: [
              {
                title: "1 John 3:8b",
                body: "Prayer: For this purpose, the Son of God was manifested, that He might destroy the works of the devil. I stand on the authority of Jesus' name to destroy every demonic oppression in my life and family. I decree that every work of the enemy shall not stand nor come to pass. Amen."
              },
              {
                title: "Ephesians 6:11-12",
                body: "Prayer: Lord, I put on the full armor of God to take my stand against the devil's schemes. My struggle is not against flesh and blood but against spiritual forces of evil. I declare victory over every form of demonic oppression in the name of Jesus. Amen."
              },
              {
                title: "Luke 10:19",
                body: "Prayer: Lord, I thank You for the authority You have given me to trample on snakes and scorpions and to overcome all the power of the enemy. In Jesus' name, I command every spirit of oppression to leave. Nothing can harm me because I am under Your protection. Amen."
              }
            ]
          },
          {
            name: 'Addiction',
            prayers: [
              {
                title: "Romans 6:14",
                body: "Prayer: Sin shall no longer be my master, for I am not under the law but under grace. I declare that addiction has no hold over me. I am free in Jesus' name. Amen."
              },
              {
                title: "John 8:36",
                body: "Prayer: If the Son sets you free, you will be free indeed. Jesus, I trust in Your promise of freedom. I break the chains of addiction over my life and walk in Your liberty. Amen."
              },
              {
                title: "Galatians 5:1",
                body: "Prayer: Lord, it is for freedom that Christ has set me free. I stand firm against the yoke of addiction and declare that I am no longer a slave to it. In Jesus name. Amen."
              }
            ]
          },
          {
            name: 'Breaking Family Patterns',
            prayers: [
              {
                title: "Ezekiel 18:1-14, 20",
                body: "Prayer: Lord, I will not share the guilt of my fathers. In the name of Jesus, I come against every negative pattern in my family; it stops now in Jesus' name. Lord step into my life, my family, and my children. I break every negative trend and cycle in my family. I declare freedom from all generational patterns and transgressions in Jesus' name. Amen."
              },
              {
                title: "Isaiah 43:19",
                body: "Prayer: Lord, You are doing a new thing in my family. I pray that every dry and barren area in our lives be refreshed and renewed. Break the old patterns and establish new ways filled with Your love and peace. Amen."
              },
              {
                title: "Joshua 24:15",
                body: "Prayer: But as for me and my household, we will serve the Lord. Break every chain that tries to keep my family bound to old patterns. Let our home be a place where Your name is honored and where new, godly patterns are established for generations to come in Jesus name. Amen."
              }
            ]
          }
        ]
      },
      {
        name: 'Healing',
        subCategories: [
          {
            name: 'Physical healing',
            prayers: [
              {
                title: "Psalm 107:20",
                body: "He sent His word and healed them, and delivered them from their destructions. Father, every affliction that has lingered in my body, (mention it) I receive my healing through Your word. From the crown of my head to the soles of my feet, I claim Your divine touch in the name of Jesus. Amen."
              },
              {
                title: "Matthew 8:17",
                body: "Himself took our infirmities, and bare our sicknesses. Lord Jesus, I thank You for taking up my infirmities and bearing my sicknesses."
              },
              {
                title: "Exodus 15:26",
                body: "For I am the Lord who heals you. Heavenly Father, You are the Lord who heals me. I place my trust in You and ask for Your healing power to flow through my body. I receive Your healing touch today. Amen."
              }
            ]
          },
          {
            name: 'Emotional healing',
            prayers: [
              {
                title: "Isaiah 61:1",
                body: "He hath sent me to bind up the brokenhearted, to proclaim liberty to the captives, and the opening of the prison to them that are bound. Lord Jesus, release me from the darkness of my wounds. I reject every spirit that has entered my life through these wounds and fill me with the light of Your love and Spirit in the name of Jesus Christ."
              },
              {
                title: "Dealing with Bitterness",
                body: "Jesus, I surrender my pain, hurt, and anger to You. Heal my heart and deliver me from bitterness. I forgive myself and others, releasing all unforgiveness and resentment. (Begin to mention it out to the Lord... every bitterness, pains and trauma of the past). Let Your mercy, peace, and Spirit flood my heart. In Jesus' name, Amen."
              },
              {
                title: "Jeremiah 30:17",
                body: "For I will restore health unto thee, and I will heal thee of thy wounds, saith the Lord. Lord, heal my wounds and restore me. I place my emotional pain in Your hands and ask for Your healing. Renew my heart with Your peace and joy. Amen."
              }
            ]
          },
          {
            name: 'Walking in divine health',
            prayers: [
              {
                title: "3 John 1:2",
                body: "Dear friend, I pray that you may enjoy good health and that all may go well with you. Lord, I thank You for Your desire for me to walk in good health. Bless my body, mind, and soul with wellness. Strengthen me as I walk in the fullness of health that You have promised. Amen."
              },
              {
                title: "Exodus 23:25",
                body: "And ye shall serve the Lord your God, and he shall bless thy bread, and thy water; and I will take sickness away from the midst of thee. Lord, as I worship You, bless my food and water. Take sickness away from me, and keep me in divine health as I trust in Your Word. Amen."
              },
              {
                title: "Isaiah 53:5",
                body: "But He was wounded for our transgressions, He was bruised for our iniquities: the chastisement of our peace was upon Him; and with His stripes we are healed. Jesus, I thank You for bearing my sickness on the cross. By Your stripes, I am healed. I walk in divine health and claim the healing You have provided for me in Jesus name. Amen."
              }
            ]
          },
          {
            name: 'Restoration',
            prayers: [
              {
                title: "Joel 2:25",
                body: "I will restore to you the years that the locust hath eaten. Lord, Restore to me all that was lost. I trust in Your power to bring complete restoration in every area of my life. In Jesus name. Amen."
              },
              {
                title: "Isaiah 61:7",
                body: "For your shame you shall have double; and for confusion they shall rejoice in their portion: therefore in their land they shall possess double: everlasting joy shall be unto them. Father, replace my shame with a double portion of blessing; my confusion is replaced with joy. Restore to me my inheritance. I shall rejoice in my portion. I embrace the double blessing and everlasting joy that You have prepared for me in Jesus name. Amen."
              },
              {
                title: "Isaiah 58:12",
                body: "Thou shalt raise up the foundations of many generations; and thou shalt be called, The repairer of the breach, The restorer of paths to dwell in. Lord, rebuild every broken area of my life. Restore my family, my relationships, and my faith. Let Your restoring power bring new life. In Jesus name. Amen."
              }
            ]
          },
          {
            name: 'Soul Ties',
            prayers: [
              {
                title: "2 Corinthians 6:14",
                body: "Do not be yoked together with unbelievers. Heavenly Father, I break every unhealthy soul tie that hinders my relationship with You. Let my soul be fully joined with Your Spirit, walking in purity and freedom in Jesus name. Amen."
              },
              {
                title: "Matthew 11:28-30",
                body: "Come to me, all you who are weary and burdened, and I will give you rest. Lord Jesus, I take Your yoke upon me. Break every chain that binds my soul and restore peace to my soul. Amen."
              },
              {
                title: "Isaiah 58:6",
                body: "To loose the chains of injustice and untie the cords of the yoke. Father, break every soul tie that oppresses me. I surrender these ties to You for total healing and restoration. In Jesus name. Amen."
              }
            ]
          },
          {
            name: 'Addiction',
            prayers: [
              {
                title: "Romans 6:14",
                body: "For sin shall no longer be your master, because you are not under the law, but under grace. Lord, I declare that addiction will no longer be my master. I am under Your grace and claim freedom from every sinful habit. Amen."
              },
              {
                title: "John 8:36",
                body: "So if the Son sets you free, you will be free indeed. I declare freedom over my life from this addiction. In Jesus name. Amen."
              },
              {
                title: "Galatians 5:1",
                body: "It is for freedom that Christ has set us free. Lord, I embrace the freedom that You have given me. I break every yoke of addiction and refuse to be enslaved by it. Amen."
              }
            ]
          }
        ]
      },
      {
        name: 'Consecration',
        subCategories: [
          {
            name: 'Intimacy with God',
            prayers: [
              {
                title: "Psalm 63:1",
                body: "You, God, are my God, earnestly I seek you; I thirst for you, my whole being longs for you. Lord, I earnestly seek You. My soul longs for Your presence. Draw me closer to You and fill my heart with Your love. Let me experience a deeper intimacy with You, Lord. Amen."
              },
              {
                title: "Psalm 27:4",
                body: "One thing I ask from the Lord... to gaze on the beauty of the Lord and to seek Him in His temple. Lord, my desire is to dwell in Your presence and behold Your beauty. Draw me into a deeper relationship where I can know You more each day. Amen."
              },
              {
                title: "James 4:8",
                body: "Come near to God and He will come near to you. Heavenly Father, I draw near to You today. I desire an intimate relationship with You. As I seek You, draw closer to me, and let my heart align with Yours. Amen."
              }
            ]
          },
          {
            name: 'Dedication',
            prayers: [
              {
                title: "Romans 12:1",
                body: "Offer your bodies as a living sacrifice, holy and pleasing to God—this is your true and proper worship. Lord, I present myself as a living sacrifice. I consecrate my life, my heart, and my actions to You. Let every part of me be an act of worship, reflecting Your holiness. Amen."
              },
              {
                title: "2 Timothy 2:21",
                body: "Those who cleanse themselves... will be instruments for special purposes, made holy, useful to the Master. Lord, cleanse me of all impurity. I dedicate myself to seeking Your will. Make me an instrument for Your special purposes, holy and ready for every good work. Amen."
              },
              {
                title: "Psalm 51:11-12",
                body: "Lord, I dedicate myself to You once again. Sustain me and uphold me by Your Spirit. Give me the zeal to commit fully to Your will. As long as I live, may my life be for Your glory. Amen."
              }
            ]
          },
          {
            name: 'Spiritual growth',
            prayers: [
              {
                title: "Ephesians 3:16-17",
                body: "That He may strengthen you with power through His Spirit in your inner being. Lord, strengthen me with Your power through the Holy Spirit. Let Christ dwell in my heart through faith, so I may grow in spiritual maturity. Amen."
              },
              {
                title: "2 Peter 3:18",
                body: "But grow in the grace and knowledge of our Lord and Savior Jesus Christ. Father, I desire to grow in Your grace and knowledge. Increase my understanding of Your Word and strengthen my faith. Let my roots grow deep in You. Amen."
              },
              {
                title: "Personal Growth",
                body: "Holy Spirit, open my understanding to the secrets of my destiny. Remove every work of the flesh in me and grant me the wisdom and strength to follow Your path. Set my heart on fire for You, Lord. Amen."
              }
            ]
          },
          {
            name: 'Revival',
            prayers: [
              {
                title: "2 Chronicles 7:14",
                body: "If My people... will humble themselves and pray... I will forgive their sin and will heal their land. Heavenly Father, I humble myself before You. I seek Your face and turn from any sin in my life. I ask for a revival in my heart, my family, and my community. Heal our land, Lord. Amen."
              },
              {
                title: "Psalm 85:6",
                body: "Will you not revive us again, that your people may rejoice in you? Lord, revive us again. Pour out Your Spirit and bring a fresh awakening in our hearts. Let us rejoice in You as You renew and restore us to our first love. Amen."
              },
              {
                title: "Habakkuk 3:2",
                body: "Repeat them in our day, in our time make them known; in wrath remember mercy. Lord, we have heard of Your mighty works. Do it again in our time. Revive us, Lord, and remember mercy as You bring a fresh wave of revival to our hearts and land. Amen."
              }
            ]
          },
          {
            name: 'Mercy',
            prayers: [
              {
                title: "Psalm 103:8-12",
                body: "The Lord is compassionate and gracious, slow to anger, abounding in love. Lord, You are full of compassion. I ask for Your mercy today. Cover me with Your love and forgive my shortcomings. Restore me in Your grace. In Jesus name. Amen."
              },
              {
                title: "Lamentations 3:22-23",
                body: "Because of the Lord's great love we are not consumed, for His compassions never fail. Lord, I thank You for Your mercies that are new every morning. Let Your faithfulness cover every part of my life, bringing renewal, healing, and peace. In Jesus name. Amen."
              },
              {
                title: "Psalm 51:1-2",
                body: "Have mercy on me, O God, according to Your unfailing love. Heavenly Father, have mercy on me. Wash away my sins and cleanse me from all unrighteousness. I need Your compassion and forgiveness. In Jesus name. Amen."
              }
            ]
          }
        ]
      },
      {
        name: 'Supplication Prayer',
        subCategories: [
          {
            name: 'Protection',
            prayers: [
              {
                title: "Psalm 140:1",
                body: "Lord, deliver me from evil and preserve me from violence. Guard my heart and keep me safe. I ask that You hide me and my family from every scheme of the enemy, every force that seeks to destroy our lives, destiny, and future. Surround us with Your protective shield, in Jesus' name. Amen."
              },
              {
                title: "Psalm 91:11",
                body: "Lord, I call upon Your mighty name today. I declare that You will give Your angels charge over me and my family to keep us in all our ways. Shield us from harm, guide our steps, and protect us from every evil force. No plague shall come near our dwelling. In Jesus' name, Amen."
              },
              {
                title: "Isaiah 54:17",
                body: "No weapon formed against me and my family shall prosper, and every tongue that rises against us in judgment is condemned. I stand on Your promise and declare that every evil plan of the enemy is destroyed. Amen."
              }
            ]
          },
          {
            name: 'Marriage',
            prayers: [
              {
                title: "Ecclesiastes 4:12",
                body: "Lord, be the third strand in our marriage, strengthening our bond. I reject every spirit of division and manipulation in my marriage. I declare that nothing shall overpower the unity we have in You. Help us to put You at the center of our relationship, binding us together in love. Amen."
              },
              {
                title: "Mark 10:9",
                body: "Lord, You have joined us together; let no one separate us. I break every unholy influence seeking to interfere with our union. I declare freedom from any spirit of polygamy or infidelity. Surround our marriage with Your peace, love, and harmony. Amen."
              },
              {
                title: "Breaking Soul Ties",
                body: "In the name of Jesus, I break every ungodly soul tie between my spouse and any unholy relationships. I declare freedom over my spouse, and I uproot every evil seduction that tries to disrupt our marriage. Holy Spirit, fill our hearts with love, purity, and commitment to each other. Amen."
              }
            ]
          },
          {
            name: 'Children',
            prayers: [
              {
                title: "Isaiah 54:13",
                body: "Lord, teach my children Your ways. Let Your peace and wisdom be upon them. I ask that You guide their hearts and fill their minds with Your truth. Surround them with Your love and protect them from harm. Amen."
              },
              {
                title: "Psalm 127:3",
                body: "Father, I declare that my children are a heritage from You. I receive them with thanksgiving, acknowledging that they are a blessing entrusted to me by Your loving hands. I pray they grow in wisdom, love, and faith, fulfilling the purpose You have set for their lives. Amen."
              },
              {
                title: "Speed and Progress (Isaiah 40:31)",
                body: "In the name of Jesus, I declare that my children shall move with divine speed. They will soar on wings like eagles, and they will not grow weary. I pray that God's grace will push them forward in every area of their lives. They will not be delayed or held back by any obstacle. Amen."
              }
            ]
          },
          {
            name: 'Salvation of loved ones',
            prayers: [
              {
                title: "Acts 16:31",
                body: "Lord, I stand on Your promise that salvation belongs to my household. I pray for the salvation of my loved ones. Open their hearts to Your truth, and draw them into a saving relationship with You. Break every chain of unbelief and lead them to the light of Your Word. In Jesus name. Amen."
              },
              {
                title: "2 Peter 3:9",
                body: "Lord, Your will is that none should perish but that all should come to repentance. I lift my loved ones before You, asking that You soften their hearts and reveal Your love to them. Let them encounter Your mercy and be transformed by Your grace. In Jesus name. Amen."
              },
              {
                title: "Spiritual Awakening",
                body: "Father, draw my loved ones to You. Let them experience Your transforming love and I commit their lives to You. In Jesus name. Amen."
              }
            ]
          },
          {
            name: 'Families',
            prayers: [
              {
                title: "Psalm 121:4",
                body: "He who keeps Israel neither slumbers nor sleeps. Lord, I ask for Your divine protection over my family. Watch over us, preserve us from evil, and guide us in every step. Keep us united in love, free from division and harm. In Jesus' name, Amen."
              }
            ]
          },
          {
            name: 'Nations',
            prayers: [
              {
                title: "1 Timothy 2:1-2",
                body: "Lord, we pray for our nation and its leaders. Grant them wisdom, integrity, and a heart to seek Your will. Let peace, prosperity, and unity be established in our land. May Your righteousness be the foundation of our nation. Amen."
              },
              {
                title: "Jeremiah 29:7",
                body: "Father, we seek the peace and prosperity of our nation. Bring harmony and unity among the communities within our borders. Let Your peace reign in every heart and corner of this nation, blessing our economy and providing for those in need. Amen."
              },
              {
                title: "National Revival",
                body: "Lord, we seek a revival in our land. Heal our nation and turn our hearts back to You. Amen."
              }
            ]
          },
          {
            name: 'Finances',
            prayers: [
              {
                title: "Deuteronomy 8:18",
                body: "Lord, I thank You for giving me the power to produce wealth. Release in me the wisdom, creativity, and strength to generate prosperity. Guide me in my financial endeavors and remove any barriers standing in my way. I declare financial freedom in Jesus' name. Amen."
              },
              {
                title: "Debt Freedom (Philip 4:6, Deu 28:12)",
                body: "Lord, I present all my debts before You. I command every spirit of debt and financial bondage to be broken. In Jesus' name, I speak to this mountain of debt and command it to be removed. I call forth supernatural provision and abundance. I trust in Your care as I cast all my financial burdens onto You. Thank You, Lord, for the financial breakthrough. In Jesus name. Amen."
              },
              {
                title: "Prayer for Prosperity (Proverbs 10:22)",
                body: "The blessing of the LORD, it maketh rich, and he addeth no sorrow with it. Heavenly Father, I ask for Your blessing upon my finances. I surrender my financial struggles to You and ask that You provide in a way that brings peace and joy. May I use the resources You give me wisely, bringing glory to Your name. Amen."
              }
            ]
          },
          {
            name: 'Nighttime Prayer',
            prayers: [
              {
                title: "Psalm 4:8",
                body: "Lord, I lie down in peace and sleep, for You alone make me dwell in safety. As I rest tonight, let Your presence surround and protect my family. Guard our home and grant us peaceful sleep. In Jesus name. Amen."
              },
              {
                title: "Psalm 91:11",
                body: "Oh Lord, I ask that You release Your angels to keep watch over us tonight. Let them shield every corner of our home from the enemy's schemes. I rebuke every satanic nightmare or evil dream in Jesus' name. I rest in Your divine protection and thank You for Your peace. In Jesus name. Amen."
              },
              {
                title: "Isaiah 31:4, Isaiah 54:17",
                body: "I decree that every roaring lion and evening wolf seeking to devour at night shall be ambushed by the hosts of heaven. No weapon formed against me shall prosper, for You, O Lord, are the King of Glory, strong and mighty in battle. Protect us and grant us a transforming encounter tonight. In Jesus name. Amen."
              }
            ]
          }
        ]
      },
      {
        name: 'Prophetic Declarations',
        subCategories: [
          {
            name: 'Confession',
            prayers: [
              {
                title: "Isaiah 61:7",
                body: "Instead of your shame you shall have double honor, and instead of confusion they shall rejoice in their portion. I declare I am favored before my mentors, supervisors, leaders, spouse, and even strangers. God's glory shines upon me. Kings will be my helpers, and queens my supporters. I receive special treatment and divine immunity wherever I go. The wealth of nations is converted to me. I am an ambassador of heaven on earth, attracting kingly attention in the name of Jesus. Amen."
              },
              {
                title: "Confession",
                body: "I declare no misunderstanding, no miscommunication, no misconception, no error in my business involvement. I submit myself to the Holy Spirit to empower my soul, spirit, and mind for extra ordinary achievements, investments, and accomplishments in Jesus name."
              },
              {
                title: "Confession",
                body: "I am free from captivity, instability, inconsistences, evil interferences in the name of Jesus. I declare my achievements and accomplishments are free from reproach, shame, and connection to past failures."
              }
            ]
          },
          {
            name: 'Commanding your Morning',
            prayers: [
              {
                title: "Job 22:28",
                body: "You will also declare a thing, and it will be established for you; so light will shine on your ways. I declare that today is blessed. I speak life, favor, success, and protection over myself and my family. I decree that light will shine on my ways, and no scheme of the enemy shall prosper against me today. I call forth opportunities, blessings, and divine appointments that align with Your will for my life."
              },
              {
                title: "Job 38:12",
                body: "Hast thou commanded the morning since thy days; and caused the dayspring to know his place? I take authority over this day in the name of Jesus. This is the day the Lord has made; I will rejoice and be glad in it. I speak to the sun, moon, and stars; you will not harm me or my family today. I trample every evil report, bewitchment, accusation, and demonic manifestation under my feet. No weapon formed against me shall prosper, and the Lord anoints my head with gladness and peace."
              },
              {
                title: "Psalm 118:24",
                body: "This is the day the Lord has made; we will rejoice and be glad in it. This is the day that You have made; I will rejoice and be glad in it. I command this morning to bring forth the goodness and blessings You have prepared for me. I ask for wisdom, discernment, and clarity in every situation I encounter. Let Your favor surround me as a shield, and may Your Spirit lead me in all things."
              }
            ]
          },
          {
            name: 'Divine Health',
            prayers: [
              {
                title: "Isaiah 53:5",
                body: "But He was wounded for our transgressions, He was bruised for our iniquities; the chastisement for our peace was upon Him, and by His stripes, we are healed. Lord, I thank You for the healing power of Jesus. By His stripes, I am healed. I declare that His sacrifice on the cross has brought healing to my body. I claim that healing now, speaking life and restoration into every cell, tissue, organ, and system within me."
              },
              {
                title: "Psalm 103:2-3",
                body: "Bless the Lord, O my soul, and forget not all His benefits: who forgives all your iniquities, who heals all your diseases. Lord you forgive all my iniquities and heal all my diseases. I praise You, Lord, for being my healer and for the benefits that come from knowing You. I declare that sickness and disease have no place in my body because I am covered by Your promises and the blood of Jesus."
              },
              {
                title: "Exodus 15:26",
                body: "I am the Lord who heals you. I stand on this truth, trusting that You are my ultimate physician. I reject every form of illness, weakness, and infirmity, and I embrace the wholeness and vitality that come from You. I receive Your healing, and I commit to living in alignment with Your will, taking care of my body as Your temple. In Jesus' mighty name, I pray. Amen."
              }
            ]
          },
          {
            name: 'God of Possibilities',
            prayers: [
              {
                title: "Matthew 19:26",
                body: "With men this is impossible, but with God all things are possible. Jesus, I declare that with You, nothing is impossible. I command every mountain of difficulty, every barrier, and every closed door in my life to bow to Your power. You are the God of possibilities, and I stand in the truth of Your Word. Amen."
              },
              {
                title: "Jeremiah 32:17",
                body: "Ah, Lord God! Behold, You have made the heavens and the earth by Your great power and outstretched arm. There is nothing too hard for You. There is absolutely nothing too difficult for You. I place every seemingly impossible situation in my life into Your mighty hands, trusting in Your unlimited power."
              }
            ]
          },
          {
            name: 'Prophetic Declarations for Daily Living',
            prayers: [
              {
                title: "Favor",
                body: "Psalm 5:12 - For You, O Lord, will bless the righteous; with favor You will surround him as with a shield. I am surrounded by God's favor. I attract divine opportunities and recognition everywhere I go. The Lord's favor encircles me like a shield."
              },
              {
                title: "Prosperity and Peace",
                body: "Psalm 42:8 - Yet the Lord will command his lovingkindness in the daytime, and in the night his song shall be with me, and my prayer unto the God of my life. As I step into the day, my light shines brightly, drawing influential attention. God's lovingkindness surrounds me, and paves my way to peace and prosperity, ensuring that I lack no good thing."
              },
              {
                title: "Success",
                body: "Psalm 1:3 - He shall be like a tree Planted by the rivers of water, That brings forth its fruit in its season, Whose leaf also shall not wither; And whatever he does shall prosper. My success is consistent. I bring forth fruit in every season. I am steadfast, blessed, and victorious in all my endeavors."
              }
            ]
          }
        ]
      }
    ]
  }
];

export { BASE_URL, API_KEY, POST_TYPE, PRAYER_TYPES, STRIPE_PUBLISHABLE_KEY, GUIDED_PRAYER_LIST };