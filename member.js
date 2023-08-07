function skillsMember() {
    var skills = ["HTML", "CSS", "JS", "PHP", "MySQL"];
    var member = {
        name: "John",
        age: 25,
        skills: skills,
        address: {
            city: "Paris",
            country: "France"
        },
        getSkills: function() {
            return this.skills;
        }
    };
    console.log(member.name);
    console.log(member.age);
    console.log(member.skills);
    console.log(member.skills[0]);
    console.log(member.skills[1]);
    console.log(member.skills[2]);
    console.log(member.skills[3]);
    console.log(member.skills[4]);
    console.log(member.address.city);
    console.log(member.address.country);
    console.log(member.getSkills());
}