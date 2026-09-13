import { RevisionPack } from '@/types/revision';

export const SAMPLE_REVISION_PACK: RevisionPack = {
  id: 'pack-distributed-systems-01',
  documentTitle: 'Distributed Systems: Consistency, Replication & The CAP Theorem',
  subject: 'Database Management Systems & Cloud Architecture',
  academicLevel: 'Undergraduate',
  examStyle: 'Mixed / Comprehensive',
  generatedAt: new Date().toISOString(),
  sourceFileName: 'Lecture_08_Distributed_Databases_CAP.pdf',
  sourceFileSize: 2458900,
  sourceFileType: 'application/pdf',
  pageCountEstimate: 18,
  stats: {
    conceptCount: 6,
    questionCount: 5,
    sectionCount: 4,
    estimatedStudyTimeMinutes: 25,
  },
  overview: {
    summary:
      'A comprehensive revision breakdown of distributed data stores, transaction semantics under network partitioning, leader-based vs leaderless replication, and trade-offs between ACID and BASE models.',
    keyThemes: [
      'CAP Theorem Trade-Offs (Consistency vs Availability under Partition)',
      'ACID vs BASE Paradigms',
      'Consensus & Quorum Reads/Writes (R + W > N)',
      'Replication Strategies & Eventual Consistency',
    ],
    prerequisites: [
      'Relational Database Basics',
      'Transaction Isolation Levels',
      'Client-Server Networking Fundamentals',
    ],
  },
  revisionNotes: [
    {
      id: 'sec-1',
      heading: '1. The CAP Theorem Foundation',
      subheading: 'Brewer’s Conjecture & Gilbert and Lynch Proof',
      summary:
        'In any distributed data store, it is impossible to simultaneously provide all three guarantees: Consistency, Availability, and Partition Tolerance.',
      bulletPoints: [
        'Partition Tolerance (P) is non-negotiable in real-world networks because network failures, packet drops, and latencies will occur.',
        'When a network partition arises, the system must make an architectural choice: drop availability to preserve linearizable consistency (CP), or accept stale/divergent reads to remain available (AP).',
        'Consistency in CAP specifically refers to Linearizability (every read receives the most recent write or an error).',
        'Availability means every non-failing node must return a non-error response for every request.',
      ],
      formulas: [
        'Partition Invariant: Networks are asynchronous and unreliable; therefore, P is always assumed present.',
        'CAP Choice: Trade-off simplifies to (CP) vs (AP) during active partitions.',
      ],
      examples: [
        'CP System Example: Apache HBase, Google Spanner (with TrueTime guarantees), ZooKeeper.',
        'AP System Example: Apache Cassandra, Amazon DynamoDB (with eventual consistency mode).',
      ],
      highlightNotes: [
        'Exam Trap: CAP does NOT say you pick any 2 of 3 arbitrarily in normal operations. When there is NO partition (normal state), systems can provide both high consistency and high availability.',
      ],
    },
    {
      id: 'sec-2',
      heading: '2. ACID vs. BASE Architectural Philosophies',
      subheading: 'Pessimistic Strictness vs Optimistic Scalability',
      summary:
        'Traditional RDBMS rely on strict transactional ACID guarantees, whereas distributed NoSQL databases often relax guarantees to BASE to achieve horizontal scale.',
      bulletPoints: [
        'Atomicity: All operations succeed or all roll back.',
        'Consistency (in ACID): Database transitions from one valid invariant state to another (distinct from CAP linearizability).',
        'Isolation: Concurrent transactions execute without cross-contamination (e.g., Serializable, Snapshot).',
        'Durability: Committed data survives hardware failure.',
        'Basically Available: System remains accessible even if portions degrade.',
        'Soft state: State may change over time even without external user input due to background propagation.',
        'Eventual consistency: Given no new updates, all replicas will eventually converge to identical values.',
      ],
      formulas: [
        'ACID: Pessimistic, Centralized/Clustered, Focus on Correctness.',
        'BASE: Optimistic, Horizontally Scaled, Focus on Continuous Uptime.',
      ],
      examples: [
        'Financial balance transfers necessitate ACID semantics to prevent double spending.',
        'Social media likes and follower count feeds leverage BASE semantics for throughput.',
      ],
      highlightNotes: [
        'Crucial for Exams: Be prepared to contrast ACID Consistency (preservation of relational constraints) with CAP Consistency (linearizability of reads/writes).',
      ],
    },
    {
      id: 'sec-3',
      heading: '3. Quorum Consensus & Replication Mechanics',
      subheading: 'Tuning Consistency in Dynamo-Style Distributed Stores',
      summary:
        'Replicated clusters use quorum arithmetic over replica set size N to balance read/write latencies and guarantee strong consistency.',
      bulletPoints: [
        'Let N = total number of replicas for a data partition.',
        'Let W = write quorum (number of nodes that must acknowledge a write before success).',
        'Let R = read quorum (number of nodes queried during a read request).',
        'Strong Consistency Condition: R + W > N ensures that the read set and write set overlap on at least one replica node holding the latest timestamp or version vector.',
        'Fast Writes Configuration: W = 1, R = N (Writes are ultra-fast, but reads pay high latency penalty).',
        'Fast Reads Configuration: R = 1, W = N (Reads are instantaneous, writes must touch every node).',
      ],
      formulas: [
        'Quorum Rule: R + W > N  => Strict Quorum (guarantees overlap).',
        'Sloppy Quorum: R + W <= N => Weak / Eventual consistency.',
      ],
      examples: [
        'Standard Cassandra deployment: N = 3, W = 2 (QUORUM), R = 2 (QUORUM). Since 2 + 2 = 4 > 3, strong consistency is guaranteed.',
      ],
      highlightNotes: [
        'Common question: Calculate the minimum read quorum required to guarantee consistency given N=5 and W=3. Solution: R > 5 - 3 => R >= 3.',
      ],
    },
    {
      id: 'sec-4',
      heading: '4. Distributed Consensus: 2-Phase Commit (2PC) vs Raft',
      subheading: 'Atomic Commitment vs Replicated State Machine Consensus',
      summary:
        'Managing coordinated state changes across multiple autonomous server nodes.',
      bulletPoints: [
        'Two-Phase Commit (2PC): Coordinator sends Prepare; participants reply Yes/No; Coordinator sends Commit/Abort.',
        '2PC Flaw: Blocking protocol. If the coordinator crashes after nodes vote Yes, participants are locked in uncertainty.',
        'Raft Protocol: Leader election, log replication, and safety invariants. Handles node crashes dynamically if a majority (N/2 + 1) nodes survive.',
      ],
      examples: [
        '2PC used in distributed RDBMS transactions across distinct shards.',
        'Raft used in modern distributed control planes such as etcd (Kubernetes) and CockroachDB.',
      ],
      highlightNotes: [
        '2PC is an Atomic Commitment Protocol; Raft/Paxos is a Consensus Protocol for replicated state machines.',
      ],
    },
  ],
  keyConcepts: [
    {
      id: 'c-1',
      name: 'CAP Theorem',
      category: 'System Architecture',
      importance: 'critical',
      definition:
        'A theoretical constraint stating a distributed computer system cannot simultaneously guarantee Consistency, Availability, and Partition Tolerance.',
      explanation:
        'Because network partitions cannot be avoided, every distributed architecture must deliberately balance between serving potentially stale data (AP) or rejecting requests to maintain strict correctness (CP).',
      relatedConcepts: ['Linearizability', 'Eventual Consistency', 'Network Partition'],
    },
    {
      id: 'c-2',
      name: 'Linearizability (Strong Consistency)',
      category: 'Consistency Models',
      importance: 'critical',
      definition:
        'The strongest single-object consistency model where operations appear to execute instantaneously on a single copy between invocation and response.',
      explanation:
        'Once a write completes, all subsequent reads across all clients globally must see that write or a newer write.',
      relatedConcepts: ['CAP Theorem', 'Sequential Consistency', 'Quorum'],
    },
    {
      id: 'c-3',
      name: 'Eventual Consistency',
      category: 'Consistency Models',
      importance: 'high',
      definition:
        'A weak consistency guarantee that if no new updates are made to an item, all access replicas will eventually return the last updated value.',
      explanation:
        'Prioritizes write and read throughput over immediate sync. Replicas reconcile asynchronously using read repair or anti-entropy gossip.',
      relatedConcepts: ['BASE', 'Gossip Protocol', 'Vector Clocks'],
    },
    {
      id: 'c-4',
      name: 'Quorum (R + W > N)',
      category: 'Replication Protocols',
      importance: 'critical',
      definition:
        'A configuration mechanism determining how many replicas must acknowledge operations to mathematically guarantee overlap between reads and writes.',
      explanation:
        'By enforcing R + W > N, the Pigeonhole Principle ensures at least one node in any read quorum witnessed the latest committed write.',
      relatedConcepts: ['Cassandra', 'Replication Factor', 'Anti-Entropy'],
    },
    {
      id: 'c-5',
      name: 'Two-Phase Commit (2PC)',
      category: 'Distributed Transactions',
      importance: 'high',
      definition:
        'An atomic commitment protocol that ensures all distributed nodes commit a transaction or all abort.',
      explanation:
        'Suffers from coordinator single-point-of-failure and blocking stalls if nodes fail during the commit phase.',
      relatedConcepts: ['Consensus', 'ACID', 'Saga Pattern'],
    },
    {
      id: 'c-6',
      name: 'Split-Brain Syndrome',
      category: 'Failure Modes',
      importance: 'medium',
      definition:
        'A catastrophic condition where a network partition isolates sub-clusters, causing multiple nodes to believe they are the sole leader.',
      explanation:
        'Can lead to divergent, un-reconcilable writes unless quorum fencing (fencing tokens / majority votes) is strictly enforced.',
      relatedConcepts: ['Fencing Tokens', 'Raft Leader Election', 'Partition Tolerance'],
    },
  ],
  importantDefinitions: [
    {
      term: 'Linearizability',
      definition:
        'A recency guarantee ensuring every read operation reflects the most up-to-date write, as if operations occurred in real-time order on a single global state.',
      contextOrFormula: 'Strongest single-key consistency model in CAP.',
    },
    {
      term: 'Partition Tolerance',
      definition:
        'The capacity of a distributed system to continue functioning despite arbitrary packet loss or network split between nodes.',
      contextOrFormula: 'Non-negotiable requirement in real physical networks.',
    },
    {
      term: 'Strict Quorum',
      definition:
        'A voting threshold where read and write replica counts satisfy R + W > N, guaranteeing that reads encounter at least one replica with the latest write version.',
      contextOrFormula: 'R + W > N',
    },
    {
      term: 'Two-Phase Locking (2PL)',
      definition:
        'A concurrency control protocol that guarantees serializability by requiring transactions to acquire locks during an expanding phase and release them only in a shrinking phase.',
      contextOrFormula: 'ACID Isolation mechanism.',
    },
    {
      term: 'Vector Clock',
      definition:
        'An algorithm used for generating partial ordering of events in a distributed system to detect causality violations and concurrent write conflicts.',
      contextOrFormula: 'Captures causal relationships [V1, V2, ... Vn].',
    },
  ],
  examQuestions: [
    {
      id: 'q-1',
      type: 'conceptual',
      question:
        'Explain why "Pick 2 out of 3" is a misleading interpretation of Brewer’s CAP Theorem in modern cloud databases.',
      modelAnswer:
        'In physical distributed systems, network partitions (P) are an inherent physical reality that cannot be prevented (e.g. fiber cuts, GC pauses, router switch crashes). Therefore, an architect cannot "choose" to omit Partition Tolerance. The true trade-off arises only *during* a partition: the system must either sacrifice availability (CP) by refusing requests to prevent inconsistency, or sacrifice consistency (AP) by returning potentially stale data to stay available. When the network is healthy, the system can provide both consistency and availability.',
      markingPoints: [
        'Mentions that Network Partition (P) is inevitable in physical distributed environments.',
        'Explains the choice during a partition: reject requests (CP) vs accept stale data (AP).',
        'Clarifies that when no partition exists, both high consistency and availability are achievable.',
      ],
      difficulty: 'hard',
    },
    {
      id: 'q-2',
      type: 'short-answer',
      question:
        'In an Apache Cassandra cluster with a Replication Factor of N = 5, what is the minimum write quorum (W) needed if read quorum (R) is set to 2 to guarantee strong consistency?',
      modelAnswer:
        'Using the Quorum rule R + W > N:\nGiven N = 5 and R = 2:\n2 + W > 5  =>  W > 3  =>  Minimum W = 4.\nTherefore, at least 4 replica nodes must acknowledge the write before it is reported as successful.',
      markingPoints: [
        'States the formula: R + W > N.',
        'Substitutes values: 2 + W > 5.',
        'Calculates correct answer: W >= 4.',
      ],
      difficulty: 'medium',
    },
    {
      id: 'q-3',
      type: 'application',
      question:
        'You are designing a ticket-booking seat reservation system vs an Instagram post like-counter. Which consistency model (ACID/CP vs BASE/AP) would you choose for each, and why?',
      modelAnswer:
        '1. Seat Reservation System: Requires an ACID / CP model. Selling the same concert seat twice (double-booking) is a critical business error. The system must enforce strong linearizable consistency and serializable isolation, even if a user request is delayed or rejected during a partition.\n2. Instagram Like Counter: Ideal for a BASE / AP model. High write and read throughput are paramount. If a follower sees 10,402 likes instead of 10,405 likes for a few seconds, user experience is unaffected. Replicas can converge asynchronously via eventual consistency.',
      markingPoints: [
        'Selects ACID / CP for seat reservations and justifies with double-booking prevention.',
        'Selects BASE / AP for like counters and justifies with latency/throughput over strict correctness.',
        'Mentions business impact and user tolerance for transient staleness.',
      ],
      difficulty: 'medium',
    },
    {
      id: 'q-4',
      type: 'descriptive',
      question:
        'Describe the Two-Phase Commit (2PC) protocol. Identify its primary failure vulnerability and how modern protocols mitigate it.',
      modelAnswer:
        'Phase 1 (Prepare): The coordinator sends a PREPARE message to all cohorts. Cohorts check local locks/constraints and respond either YES (prepared) or NO.\nPhase 2 (Commit/Abort): If all cohorts voted YES, coordinator sends COMMIT. If any voted NO or timed out, coordinator sends ABORT.\n\nVulnerability: 2PC is a blocking protocol. If the coordinator crashes after cohorts have voted YES but before sending the decision, all cohorts remain indefinitely locked holding transaction resources.\n\nMitigation: Modern architectures replace 2PC with replicated consensus protocols (such as Raft or Paxos) which tolerate node and leader crashes as long as a quorum majority remains online.',
      markingPoints: [
        'Correctly details Phase 1 (Prepare / Vote) and Phase 2 (Commit / Abort).',
        'Identifies the blocking coordinator crash vulnerability.',
        'Proposes consensus protocols (Raft/Paxos/3PC) as modern mitigations.',
      ],
      difficulty: 'hard',
    },
    {
      id: 'q-5',
      type: 'short-answer',
      question:
        'Differentiate between ACID Consistency and CAP Theorem Consistency.',
      modelAnswer:
        'ACID Consistency means Application Invariant Correctness (e.g., foreign key integrity, balance >= 0, schema constraints). CAP Consistency specifically means Linearizability (every read receives the most recent write, behaving like a single synchronous register).',
      markingPoints: [
        'ACID Consistency: application/schema invariants.',
        'CAP Consistency: single-register linearizability across time.',
      ],
      difficulty: 'easy',
    },
  ],
  examMode: {
    mustKnow: [
      'CAP Theorem rule: In a network partition (P), you must choose either Linearizable Consistency (CP) or Continuous Availability (AP). You cannot evade P.',
      'Quorum Formula: R + W > N ensures at least one node in the read set has the latest committed write.',
      'ACID vs BASE: ACID provides strict transactional invariants (Money, Tickets); BASE provides horizontal scalability and eventual consistency (Social Feeds, Telemetry).',
      'Two-Phase Commit (2PC) is a blocking protocol that can hang if the coordinator fails during Phase 2.',
      'Split-Brain prevention requires majority quorum (N/2 + 1) or fencing tokens.',
    ],
    importantDefinitions: [
      {
        term: 'Linearizability',
        definition: 'Global real-time sequential order for reads and writes on a single register.',
      },
      {
        term: 'Eventual Consistency',
        definition: 'Guarantees that all replicas converge to the same value if no further updates occur.',
      },
      {
        term: 'Quorum Overlap',
        definition: 'Condition R + W > N where read and write quorums share at least one common replica.',
      },
      {
        term: 'Two-Phase Commit',
        definition: 'Atomic commit protocol requiring unanimous vote across all participating shards.',
      },
    ],
    commonConfusions: [
      {
        conceptA: 'ACID Consistency',
        conceptB: 'CAP Consistency',
        distinction:
          'ACID Consistency ensures database constraints & invariants remain valid. CAP Consistency is strictly Linearizability (recency of distributed reads).',
      },
      {
        conceptA: 'Two-Phase Commit (2PC)',
        conceptB: 'Two-Phase Locking (2PL)',
        distinction:
          '2PC is an atomic commitment protocol across distributed nodes. 2PL is a concurrency control mechanism on a single database engine to guarantee serializability.',
      },
      {
        conceptA: 'High Availability',
        conceptB: 'Fault Tolerance',
        distinction:
          'High Availability focuses on system uptime from the client perspective (uptime percentage). Fault Tolerance is the internal capability to mask node crashes transparently.',
      },
    ],
    likelyQuestions: [
      {
        question: 'Calculate quorum read/write configuration for N = 5 replicas.',
        coreAnswerHint: 'Set W = 3, R = 3 (since 3 + 3 = 6 > 5, majority quorum is preserved).',
      },
      {
        question: 'Why is 2PC considered a blocking protocol?',
        coreAnswerHint:
          'Cohorts that voted YES must wait indefinitely if the coordinator dies before issuing Commit/Abort.',
      },
      {
        question: 'What is the trade-off in an AP system during a partition?',
        coreAnswerHint:
          'The system remains available and accepts writes, but different nodes return divergent/stale data.',
      },
    ],
    quickRevisionSummary:
      'Distributed systems face inevitable network splits (P). CP systems lock to ensure correctness; AP systems stay online and accept eventual consistency. To guarantee strong consistency without full locks, tune quorum parameters so R + W > N. For mission-critical balance updates use ACID/CP; for massive scale use BASE/AP.',
  },
};
