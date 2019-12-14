'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Products', [
      {
        'id': 1,
        'name': 'Awesome Shirt',
        'description': 'Sapiente ut sed labore. Omnis fuga exercitationem explicabo omnis laboriosam. Minima eum consequuntur et illum.',
        'price': 1500,
        'img_url': 'http://lorempixel.com/640/480',
        'category_id': 1
      },
      {
        'id': 2,
        'name': 'Amazing Shorts',
        'description': 'Enim voluptatum excepturi laboriosam quis. Consequuntur perferendis consequatur sed corporis. Itaque rerum aliquam ut tempora perferendis.',
        'price': 2500,
        'img_url': 'http://lorempixel.com/640/480',
        'category_id': 1
      },
      {
        'id': 3,
        'name': 'Mousepad',
        'description': 'Suscipit molestias et nobis quo et voluptatibus voluptatum excepturi. Labore et et. Id aliquam sed sed dolor voluptas nihil accusamus.',
        'price': 1000,
        'img_url': 'http://lorempixel.com/640/480',
        'category_id': 2
      },
      {
        'id': 4,
        'name': '10 Pack HDMI Cords',
        'description': 'Vero qui sapiente totam quo voluptatum aut iste odit maiores. Est est dicta. Commodi aperiam rerum vel. Voluptatem itaque tenetur odio voluptate exercitationem eum. Ut minima autem quam minus quasi aperiam.',
        'price': 5000,
        'img_url': 'http://lorempixel.com/640/480',
        'category_id': 2
      },
      {
        'id': 5,
        'name': 'Beautiful Bookshelf',
        'description': 'Velit temporibus quisquam voluptas reprehenderit et illo qui. Voluptas ad suscipit harum amet sit veritatis tenetur. Eveniet pariatur non consequatur quia id voluptates ad. Quaerat debitis et architecto dolore.',
        'price': 7500,
        'img_url': 'http://lorempixel.com/640/480',
        'category_id': 3
      },
      {
        'id': 6,
        'name': 'Da Best Desk',
        'description': 'Libero est nisi. Omnis temporibus aliquid ea repudiandae et. Id minima aliquid aliquam eaque sed eos. Sunt blanditiis ducimus praesentium maxime odit. Voluptatum quia non enim unde non illo.',
        'price': 10000,
        'img_url': 'http://lorempixel.com/640/480',
        'category_id': 3
      }
    ], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Products', null, {})
  }
};
