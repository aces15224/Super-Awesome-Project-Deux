module.exports = function(sequelize, DataTypes) {
    var Listings = sequelize.define("Listings", {
      sellerName:{
          type: DataTypes.STRING,     
          allowNull: false,
          validate: {
            len: [1, 50]
          }
        },
      email:{
          type: DataTypes.STRING,     
          allowNull: false,
          validate: {
            len: [1, 100]
          }
        },
      
      sellingPrice: {
          type: DataTypes.INTEGER,     
          allowNull: false,
          validate: {
            len: [1, 10],
            isInt: true
          }
        },
      sqFootage:{
          type: DataTypes.INTEGER,     
          allowNull: false,
          validate: {
            len: [1, 10],
            isInt: true
          }
        }, 
      bedrooms:{
          type: DataTypes.INTEGER,     
          allowNull: false,
          validate: {
            len: [1, 10],
            isInt: true
          }
        }, 
      areaZip:{
          type: DataTypes.INTEGER,     
          allowNull: false,
          validate: {
            len: [1, 10],
            isInt: true
          }
        },
      image:{
          type: DataTypes.STRING,     
          allowNull: false,
          validate: {
              len: [1, 100]
          }
        },
      hotAndCold:{
          type:DataTypes.BOOLEAN,
          defaultValue: false
      }
  });
  return Listings;
  };
  
  