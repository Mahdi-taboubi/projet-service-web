const { v4: uuidv4 } = require("uuid");

let freelancers = [];

const resolvers = {
  Query: {
    listFreelancers: () => freelancers,
    getFreelancerById: (_, { id }) => freelancers.find((f) => f.id === id),
  },
  Mutation: {
    createFreelancer: (_, { input }) => {
      const freelancer = {
        id: uuidv4(),
        ...input,
        skills: [],
        links: [],
        communications: [],
      };
      freelancers.push(freelancer);
      return freelancer;
    },
    updateFreelancer: (_, { id, input }) => {
      const index = freelancers.findIndex((f) => f.id === id);
      if (index === -1) return null;
      freelancers[index] = { ...freelancers[index], ...input };
      return freelancers[index];
    },
    deleteFreelancer: (_, { id }) => {
      const index = freelancers.findIndex((f) => f.id === id);
      if (index === -1) return false;
      freelancers.splice(index, 1);
      return true;
    },
    addSkill: (_, { freelancerId, input }) => {
      const freelancer = freelancers.find((f) => f.id === freelancerId);
      if (!freelancer) return null;
      const skill = { id: uuidv4(), ...input };
      freelancer.skills.push(skill);
      return freelancer;
    },
    removeSkill: (_, { freelancerId, skillId }) => {
      const freelancer = freelancers.find((f) => f.id === freelancerId);
      if (!freelancer) return null;
      freelancer.skills = freelancer.skills.filter((s) => s.id !== skillId);
      return freelancer;
    },
    addLink: (_, { freelancerId, input }) => {
      const freelancer = freelancers.find((f) => f.id === freelancerId);
      if (!freelancer) return null;
      const link = { id: uuidv4(), ...input };
      freelancer.links.push(link);
      return freelancer;
    },
    removeLink: (_, { freelancerId, linkId }) => {
      const freelancer = freelancers.find((f) => f.id === freelancerId);
      if (!freelancer) return null;
      freelancer.links = freelancer.links.filter((l) => l.id !== linkId);
      return freelancer;
    },
    addCommunication: (_, { freelancerId, input }) => {
      const freelancer = freelancers.find((f) => f.id === freelancerId);
      if (!freelancer) return null;
      const communication = { id: uuidv4(), ...input };
      if (!freelancer.communications) {
        freelancer.communications = [];
      }
      freelancer.communications.push(communication);
      return freelancer;
    },
    removeCommunication: (_, { freelancerId, communicationId }) => {
      const freelancer = freelancers.find((f) => f.id === freelancerId);
      if (!freelancer) return null;
      freelancer.communications = freelancer.communications.filter(
        (c) => c.id !== communicationId
      );
      return freelancer;
    },
  },
};

module.exports = resolvers;
