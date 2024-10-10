<?php

namespace App\DataFixtures;

use App\Entity\Socio;
use App\Entity\Empresa;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;

class SocioFixtures extends Fixture implements DependentFixtureInterface
{
    public function load(ObjectManager $manager)
    {
        $nomesSocios = [
            'Sócio 1',
            'Sócio 2',
            'Sócio 3',
            'Sócio 4',
            'Sócio 5'
        ];

        foreach ($nomesSocios as $index => $nome) {
            $socio = new Socio();
            $socio->setNome($nome);
            $socio->setEmpresa($this->getReference('empresa_' . ($index % 5)));

            $manager->persist($socio);
        }

        $manager->flush();
    }

    public function getDependencies()
    {
        return [
            EmpresaFixtures::class,
        ];
    }
}
