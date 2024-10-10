<?php

namespace App\DataFixtures;

use App\Entity\Empresa;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class EmpresaFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {
        $nomesEmpresas = [
            'Empresa A',
            'Empresa B',
            'Empresa C',
            'Empresa D',
            'Empresa E'
        ];

        foreach ($nomesEmpresas as $index => $nome) {
            $empresa = new Empresa();
            $empresa->setNome($nome);
            $manager->persist($empresa);

            $this->addReference('empresa_' . $index, $empresa);
        }

        $manager->flush();
    }
}
