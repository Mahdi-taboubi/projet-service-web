const freelancers = [];

module.exports = {
  Query: {
    listFreelancers: () => freelancers,
    getFreelancerById: (_, { id }) => freelancers.find((f) => f.id === id),
  },

  Mutation: {
    createFreelancer: (_, { input }) => {
      const newFreelancer = {
        id: Date.now().toString(),
        ...input,
        skills: [],
        links: [],
      };
      freelancers.push(newFreelancer);
      return newFreelancer;
    },

    updateFreelancer: (_, { id, input }) => {
      const freelancer = freelancers.find((f) => f.id === id);
      if (freelancer) {
        Object.assign(freelancer, input);
        return freelancer;
      }
      return null;
    },

    deleteFreelancer: (_, { id }) => {
      const index = freelancers.findIndex((f) => f.id === id);
      if (index > -1) {
        freelancers.splice(index, 1);
        return true;
      }
      return false;
    },

    addSkill: (_, { freelancerId, input }) => {
      const freelancer = freelancers.find((f) => f.id === freelancerId);
      if (freelancer) {
        const newSkill = { id: Date.now().toString(), ...input };
        freelancer.skills.push(newSkill);
        return freelancer;
      }
      return null;
    },

    removeSkill: (_, { freelancerId, skillId }) => {
      const freelancer = freelancers.find((f) => f.id === freelancerId);
      if (freelancer) {
        freelancer.skills = freelancer.skills.filter((s) => s.id !== skillId);
        return freelancer;
      }
      return null;
    },

    addLink: (_, { freelancerId, input }) => {
      const freelancer = freelancers.find((f) => f.id === freelancerId);
      if (freelancer) {
        const newLink = { id: Date.now().toString(), ...input };
        freelancer.links.push(newLink);
        return freelancer;
      }
      return null;
    },

    removeLink: (_, { freelancerId, linkId }) => {
      const freelancer = freelancers.find((f) => f.id === freelancerId);
      if (freelancer) {
        freelancer.links = freelancer.links.filter((l) => l.id !== linkId);
        return freelancer;
      }
      return null;
    },
  },
};
