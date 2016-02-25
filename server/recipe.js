'use strict';

module.exports = function(server) {
  server.route({
    method: 'GET',
    path: '/api/recipe/{recipeId}',
    handler: function(req, reply) {
      var recipes = [
        {
          id: 'truffes',
          theme: 'dossier_speciaux',
          image: 'http://images.marmitoncdn.org/PixContent//2fee89d2-ef0d-4043-9cf5-7054671da8e6/9791215c-a43f-48a7-9dc3-a481ae3781a7/truffe_chocolat_183x83.jpg',
          name: 'Truffes au chocolat',
          description: 'On fond pour les truffes et surtout, on teste toutes les recettes pour choisir ses préférées.',
          type: 'Dossier',
          attributes: ['Dossiers Spéciaux'],
        },
        {
          id: 'choco_blanc',
          theme: 'dossier_speciaux',
          image: 'http://images.marmitoncdn.org/PixContent//e18d3163-432e-4525-bd8e-48b4961ecefe/8bd8b20b-b17f-47c8-8896-ad4567b64126/chocolat-blanc_183x83.jpg',
          name: 'Chocolat blanc',
          description: 'par Ester (blog "Ester Kitchen") Râpé, fondu ou à croquer, une chose est sûre : le chocolat blanc, il va vous faire fondre !',
          type: 'Dossier',
          attributes: ['Dossiers Spéciaux'],
        },
        {
          id: 'choco_noel',
          theme: 'dossier_speciaux',
          image: 'http://images.marmitoncdn.org/PixContent//2fee89d2-ef0d-4043-9cf5-7054671da8e6/54d5e5b2-a8b9-4978-b8e3-51496afe7449/chocolat_noel_183x83.jpg',
          name: 'Chocolat de Noël',
          description: 'Et si vous faisiez vos propres chocolats de Noël cette année ? C\'est facile grâce à toutes nos astuces et recettes.',
          type: 'Dossier',
          attributes: ['Dossiers Spéciaux'],
        },
        {
          id: 'choco_paques',
          theme: 'dossier_speciaux',
          image: 'http://images.marmitoncdn.org/PixContent//2fee89d2-ef0d-4043-9cf5-7054671da8e6/9471e7ec-d05f-4e1f-b516-ed0deef0f8be/Paques-chocolats-de-paques_183x83.jpg',
          name: 'Chocolats de Pâques',
          description: 'Pas de Pâques sans chocolats ! Alors vite, faites le tour des chocolats de Pâques... qu\'ils soient maison ou non, ils sont toujours bons.',
          type: 'Dossier',
          attributes: ['Dossiers Spéciaux'],
        },
        {
          id: 'choco_chaud',
          theme: 'dossier_speciaux',
          image: 'http://images.marmitoncdn.org/PixContent//e18d3163-432e-4525-bd8e-48b4961ecefe/fd3a4319-15c5-e5b6-7d3e-6c7aec134bc9/chocolat_chaud_183x83.jpg',
          name: 'Chocolat chaud',
          description: 'par Aurélie (Blog "Set de table") Un tour du monde des chocolats chauds en 6 escales, aussi gourmand que réconfortant à déguster !',
          type: 'Dossier',
          attributes: ['Dossiers Spéciaux'],
        },
        {
          id: 'churros',
          theme: 'recette_sponso',
          image: 'http://images.marmitoncdn.org/recipephotos/multiphoto/78/78a11521-6f4c-4113-9125-88f6b48b9a3f_tn-155.jpg',
          name: 'Churros sans gluten et chocolat',
          times: [
            {class: 'm_prep_time', time: '20 min'},
            {class: 'm_cooking_time', time: '4 min'},
          ],
          rates: {
            rate: 0,
            votes: 0,
          },
          type: 'Recette',
          attributes: ['Dessert', 'Moyenne', 'Moyen'],
          description: 'Ingrédients : lait, chocolat noir, huile de friture, eau, sel, sucre. Commencer par préparer la pâte à churros : amener l\'eau à ébullitione sel puis, hors du feu, ajouter la farine. Mélanger jusqu\'à obtention d\'une pâte lisse. La verser dans...',
        },
        {
          id: 'salon_choco',
          theme: 'dossier_speciaux',
          image: 'http://images.marmitoncdn.org/PixContent//70e30513-8902-4bf4-8c07-70d57b779a8f/befb2d6a-15c5-e5b6-7d7f-618bb01bce2b/salon_du_chocolat_183x83.jpg',
          name: 'Salon du chocolat',
          type: 'Dossier',
          attributes: ['Diaporamiam'],
          description: 'Le Salon du Chocolat , rendez-vous des gourmands de tous âges ! Le chocolat y coule à flots, mais également l\' art , la finesse , la douceures nombreux artisans pâtissiers &nbsp;et chocolatiers . Découvrez avec nous ces quelques carrés de...',
        },
        {
          id: '100_choco',
          theme: 'recette_selection',
          image: 'http://images.marmitoncdn.org/pixcontent/selections/4a2d7354-8346-449c-844e-c9d32a87b7a0/fondant-chocolat_200x300.jpg',
          name: '100 % chocolat',
          type: 'Sélection',
          description: 'Faites le plein d\'énergie et faites-vous plaisir en même temps ! Le chocolat , c\'est du gâteau, mais également des saveurs étonnantes pour agrémenter plats et entrées... Sans oublier le dessert au chocolat que tout le monde plébiciste...',
        },
        {
          id: 'cake_choco',
          theme: 'recette_classique',
          image: 'http://images.marmitoncdn.org/recipephotos/multiphoto/da/dae88f8f-5325-4f47-a394-3267688f0f7f_tn-155.jpg',
          name: 'Cake au chocolat',
          times: [
            {class: 'm_prep_time', time: '15 min'},
            {class: 'm_cooking_time', time: '30 min'},
          ],
          rates: {
            rate: 5,
            votes: 566,
          },
          type: 'Recette',
          attributes: ['Dessert', 'Très facile', 'Bon marché', 'Végétarien'],
          description: '><b>Ingrédients</b> : Poudre d\'amande, oeuf, levure, sucre en poudre, farine, beurre, chocolat pâtissier. Faire fondre le chocolat (en morceaux) au baines à soupe d’eau (ou le faire au micro-ondes). Dans un saladier, battre les oeufs...',
        },
        {
          id: 'charlotte_choco',
          theme: 'recette_classique',
          image: 'http://images.marmitoncdn.org/recipephotos/multiphoto/94/94ed7215-39b3-40b5-bd5b-648880a28a45_tn-155.jpg',
          name: 'Charlotte au chocolat',
          times: [
            {class: 'm_prep_time', time: '45 min'},
          ],
          rates: {
            rate: 5,
            votes: 139,
          },
          type: 'Recette',
          attributes: ['Dessert', 'Facile', 'Moyen', 'Végétarien'],
          description: '<b>Ingrédients</b> : biscuits à la cuillère, oeuf, lait, beurre, crème fraîche liquide, rhum, chocolat pâtissier, sucre glace. Beurrer légèrement un moulet disposer dans le fond un rond de papier sulfurisé. Verser 10 cl d\'eau et le rhum dans...',
        },
        {
          id: 'pave_choco',
          theme: 'recette_classique',
          image: 'http://images.marmitoncdn.org/recipephotos/multiphoto/be/be15effd-3ca9-4e53-8c74-eb27a2b4506c_tn-155.jpg',
          name: 'Pavé au chocolat',
          times: [
            {class: 'm_prep_time', time: '10 min'},
            {class: 'm_cooking_time', time: '15 min'},
          ],
          rates: {
            rate: 5,
            votes: 135,
          },
          type: 'Recette',
          attributes: ['Dessert', 'Très facile', 'Bon marché', 'Végétarien'],
          description: '<b>Ingrédients</b> : oeuf, farine, beurre, chocolat, sucre. Dans une casserole, faites fondre le chocolat et le beurre en morceaux. Mélangez le sucre et les oeufs entiers, ajoutez le chocolat/beurre fondu et la farine; remuez...',
        },
        {
          id: 'brownie_choco',
          theme: 'recette_sponso',
          image: 'http://images.marmitoncdn.org/recipephotos/multiphoto/ef/ef506574-7d59-4a21-8c95-e35a3486ad9d_tn-155.jpg',
          name: 'Brownies aux amandes sans gluten',
          times: [
            {class: 'm_prep_time', time: '1 h'},
            {class: 'm_cooking_time', time: '20 min'},
          ],
          rates: {
            rate: 0,
            votes: 0,
          },
          type: 'Recette',
          attributes: ['Dessert', 'Facile', 'Moyen'],
          description: 'Ingrédients : oeuf, chocolat noir, beurre, amande, sucre glace. Préchauffer le four à 180°C (thermostat 6). Fouetter les jaunes d\'oeufs avec le sucre puis ajouter la farine. Faire fondre le chocolat avec le beurre puis les ajouter ainsi...',
        },
        {
          id: 'malaisie',
          theme: 'dossier_speciaux',
          image: 'http://images.marmitoncdn.org/PixContent//70e30513-8902-4bf4-8c07-70d57b779a8f/ee5a6967-15c5-e5b6-7dce-aa56d5ec890e/CUISINE_MALAISE_183.jpg',
          name: 'Que cuisine-t-on en Malaisie ?',
          description: 'Du fruit du dragon au terrible durian , en passant par toutes sortes de choses aux couleurs exotiques, plongez avec nous dans la cuisine malaise...',
          type: 'Dossier',
          attributes: ['Diaporamiam'],
        },
      ];

      for (var i = 0; i < recipes.length; i++) {
        if (recipes[i].id === req.params.recipeId) {
          var message = recipes[i];
          reply(message)
            .header('Content-Length', message.length)
            .header('Server', 'HandsOnServer')
          ;
          return;
        }
      }

      reply(null, 404).header('Server', 'HandsOnServer');
    },
  });
};
